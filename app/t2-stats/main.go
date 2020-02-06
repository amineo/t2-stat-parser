/*

Parser for DarkTiger's T2 Server Stats

[TODO]
	- Read Additional GameTypes on the fly
	- Use go modules
	- Update to v4 SQL driver
	- Ability to download stat files from remote server via FTP
*/

package main

import (
	"bufio"
	"database/sql"
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"regexp"
	"strconv"
	"strings"
	"time"

	_ "github.com/jackc/pgx/stdlib"
	"github.com/jmoiron/sqlx"
	"github.com/pkg/errors"

	"github.com/rs/xid"
)

var (
	connectionString = flag.String("conn", getenvWithDefault("DATABASE_URL", ""), "PostgreSQL connection string")
	db               *sqlx.DB
	maxStatOverwrite int = 100
	debugLevel       int = 1 // 0 off,min | 1 Basic output checks | 2 Output all the things
)

func getenvWithDefault(name, defaultValue string) string {
	val := os.Getenv(name)
	if val == "" {
		val = defaultValue
	}

	return val
}

func genXid() string {
	id := xid.New()
	return id.String()
}

// Game is...
type Game struct {
	playerGUID int    `db.players:"player_guid"`
	playerName string `db.players:"player_name"`
	totalGames int    `db.players:"total_games"`

	dbStatOverWrite int `db.players:"stat_overwrite"`
	statOverWrite   int

	gameMap   string `db.games:"map"`
	gameType  string `db.games:"gametype"`
	dateStamp string `db.games:"datestamp"`
	stats     string `db.games:"stats"`
	uuid      string `db.games:"uuid"`
}

func main() {
	start := time.Now()
	flag.Parse()
	var err error

	// postgres connection
	if *connectionString == "" {
		log.Fatalln("Please pass the connection string using the -conn option")
	}

	db, err = sqlx.Connect("pgx", *connectionString)
	if err != nil {
		log.Fatalf("Unable to establish connection: %v\n", err)
	}
	// ----

	var statFiles []string
	statFolder := "serverStats/CTFGame" // GameType is CTFGame
	fileErr := filepath.Walk(statFolder, func(path string, info os.FileInfo, fileErr error) error {

		r, err := regexp.MatchString("g.cs", path)
		if err == nil && r {
			statFiles = append(statFiles, path)
		}

		return nil
	})
	if fileErr != nil {
		panic(fileErr)
	}

	for _, file := range statFiles {
		fmt.Println(file)
		g := Game{}
		// The file name is the player GUID so we need to store that in the object since its not part of the stat line
		// Add playerGUID, gameType  as part of the stat line
		g.gameType = strings.Split(file, "/")[1]
		g.playerGUID, err = strconv.Atoi(regexp.MustCompile("[0-9]+").FindAllString(file, -1)[0])
		if err != nil {
			fmt.Println("Couldn't convert playerGUID to an int", err)
		}

		file, err := os.Open(file)
		//file, err := os.Open("serverStats/CTFGame/1g.cs")
		if err != nil {
			log.Fatal(err)
		}
		defer file.Close()

		// Raw map for the stat lines in the file
		mStatLine := make(map[string][]string)

		scanner := bufio.NewScanner(file)
		for scanner.Scan() {

			statScanLine := scanner.Text()

			// Split the lines on %t
			lineParts := strings.Split(statScanLine, "%t")
			// The first token of the part is the key
			statHeading := lineParts[0]
			// Loop over the parts from the string.
			for i := range lineParts {
				if i > 0 {
					mStatLine[statHeading] = append(mStatLine[statHeading], lineParts[i])
				}
			}

		}
		if err := scanner.Err(); err != nil {
			log.Fatal(err)
		}

		g.playerName = mStatLine["playerName"][0]
		g.totalGames, err = strconv.Atoi(mStatLine["totalGames"][0])
		if err != nil {
			fmt.Println("Couldn't convert totalGames to an int", err)
		}
		g.statOverWrite, err = strconv.Atoi(mStatLine["statsOverWrite"][0])
		if err != nil {
			fmt.Println("Couldn't convert statOverWrite to an int", err)
		}

		if debugLevel >= 1 {
			// These dont have a position offset
			fmt.Println("playerGUID", g.playerGUID)
			fmt.Println("GameType", g.gameType)
			fmt.Println("Player Name", g.playerName)

			fmt.Println("Stat Overwrite", g.statOverWrite)
			fmt.Println("maxStatOverwrite", maxStatOverwrite)
		}

		checkPlayer(g)
		g.dbStatOverWrite = getDBStatOverWrite(g.playerGUID)

		statCron := 0
		if g.statOverWrite < g.dbStatOverWrite {
			statCron = (maxStatOverwrite - g.statOverWrite) + g.dbStatOverWrite
		} else {
			statCron = g.statOverWrite - g.dbStatOverWrite
		}
		if debugLevel >= 1 {
			fmt.Println("statCron", statCron)
		}

		for i := 1; i <= statCron; i++ {
			arrPosition := i - 1
			fmt.Println(arrPosition)
			parseStatOverWriteLine(g, mStatLine, arrPosition)
		}

		fmt.Println("---")
	}

	// Close connection to DB
	//defer conn.Close(context.Background())

	fmt.Println("Total Execution time: ", time.Since(start))
}

func parseStatOverWriteLine(g Game, mStatLine map[string][]string, arrPosition int) {

	if debugLevel == 1 {
		fmt.Println("Running fn parseStatOverWriteLine")
		fmt.Println("playerGUID", g.playerGUID, "arrPosition", arrPosition)
	}

	cleanStatLine := make(map[string][]string)
	for index, element := range mStatLine {
		if len(element) > 1 {
			cleanStatLine[index] = append(cleanStatLine[index], element[arrPosition])
		}
	}

	jsonStats, err := json.Marshal(cleanStatLine)
	if err != nil {
		log.Fatal("Error parsing jsonStats", err)
	}
	g.stats = string(jsonStats)
	g.dateStamp = mStatLine["dateStamp"][arrPosition]
	g.uuid = genXid()
	g.gameMap = cleanStatLine["map"][0]

	if debugLevel >= 2 {
		// log the game struct
		fmt.Println(g)
	}

	// insert game stat
	addPlayerGameStat(g)
}

func rowExists(query string, args ...interface{}) bool {
	var exists bool
	query = fmt.Sprintf("SELECT exists (%s)", query)
	err := db.QueryRow(query, args...).Scan(&exists)
	if err != nil && err != sql.ErrNoRows {
		errors.Wrap(err, "error checking if row exists")
	}
	return exists
}

func checkPlayer(g Game) {
	check := rowExists("select player_guid from players where player_guid = $1", g.playerGUID)
	if !check {
		createPlayer(genXid(), g)
	} else {
		fmt.Println("Player already exists", g.playerName)
	}
}

func createPlayer(uuid string, g Game) {
	fmt.Println("Creating new player", g.playerName)
	_, err := db.Exec("insert into players(uuid, player_guid, player_name) values($1,$2,$3)", uuid, g.playerGUID, g.playerName)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to add player's game stat: %v\n", err)
		os.Exit(1)
	}
}

func getDBStatOverWrite(playerGUID int) int {
	var dbStatOverWrite, dbPlayerGUID int
	// Used to compare ingested statOverWrite to known dbStatOverWrite
	err := db.QueryRow("select player_guid, stat_overwrite from players where player_guid = $1", playerGUID).Scan(&dbPlayerGUID, &dbStatOverWrite)
	if err != nil {
		fmt.Fprintf(os.Stderr, "QueryRow failed: %v\n", err)
		os.Exit(1)
	}
	return dbStatOverWrite
}

func addPlayerGameStat(g Game) {

	if debugLevel == 1 {
		fmt.Println("g.dbStatOverWrite", g.dbStatOverWrite, "g.statOverWrite", g.statOverWrite)
	}

	if g.dbStatOverWrite != g.statOverWrite {
		// Insert new stat line
		fmt.Println("New stat line!", g.playerName)
		sqlInsert := `insert into games(player_guid, player_name, stat_overwrite, map, stats, datestamp, uuid, gametype) values($1,$2,$3,$4,$5,$6,$7,$8)`
		_, err := db.Exec(sqlInsert, g.playerGUID, g.playerName, g.statOverWrite, g.gameMap, g.stats, g.dateStamp, g.uuid, g.gameType)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Unable to add player's game stat: %v\n", err)
			os.Exit(1)
		}

		// Need to update a players statOverWrite after comparison
		sqlUpdate := `UPDATE players SET stat_overwrite = $2, total_games = $3 WHERE player_guid = $1;`
		_, err = db.Exec(sqlUpdate, g.playerGUID, g.statOverWrite, g.totalGames)
		if err != nil {
			panic(err)
		}
	} else {
		fmt.Println("This stat line already exists")
	}
}
