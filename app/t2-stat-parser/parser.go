/*

Parser for DarkTiger's T2 Server Stats

[TODO]
	- Update to v4 SQL driver
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
	maxStatOverwrite int = 98 // there are 99 entries, remember arr counts 0
	debugLevel       int = 1  // 0 off,min | 1 Basic output checks | 2 Output all the things
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

	gameMap   string `db.game_detail:"map"`
	gameID    int    `db.game_detail:"game_id"`
	gameType  string `db.game_detail:"gametype"`
	dateStamp string `db.game_detail:"datestamp"`
	stats     string `db.game_detail:"stats"`
	uuid      string `db.game_detail:"uuid"`
}

func initParser() {

	GameTypes := [4]string{"CTFGame", "DMGame", "LakRabbitGame", "SCtFGame"}

	for _, gt := range GameTypes {
		fmt.Println("Parsing GameType", gt)
		parseGameTypeStats(gt)
	}
}

func parseGameTypeStats(gt string) {
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
	statFolder := "serverStats/stats/" + gt // GameType is ...
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
		g.gameType = strings.Split(file, "/")[2]
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
		if g.statOverWrite < 0 {
			fmt.Println("Got negative stat Overwrite in file, aborting this stat line")
			break
		}

		// Base the maxGamesLength off how many elements are present in the map length since this should always be there
		statArrayMaxLength := len(mStatLine["map"])

		checkPlayer(g)
		g.dbStatOverWrite = getDBStatOverWrite(g.playerGUID, strings.ToLower(gt))

		if debugLevel >= 1 {
			// These dont have a position offset
			fmt.Println("playerGUID", g.playerGUID)
			fmt.Println("GameType", g.gameType)
			fmt.Println("Player Name", g.playerName)

			fmt.Println("Stat Overwrite", g.statOverWrite)
			fmt.Println("maxStatOverwrite", maxStatOverwrite)

			fmt.Println("statArrayMaxLength", statArrayMaxLength)

			fmt.Println("g.dbStatOverWrite", g.dbStatOverWrite)
		}

		// statEntryDiff := 0
		// if g.statOverWrite < g.dbStatOverWrite {
		// 	//          100 -
		// 	statEntryDiff = (maxStatOverwrite - g.statOverWrite) + g.dbStatOverWrite
		// } else {
		// 	statEntryDiff = g.statOverWrite - g.dbStatOverWrite
		// }

		// // Reset statEntryDiff if it flows over maxStatOverwrite
		// if statEntryDiff > maxStatOverwrite {
		// 	statEntryDiff = 0
		// }

		// if debugLevel >= 1 {
		// 	fmt.Println("statEntryDiff", statEntryDiff)
		// }

		for i := 0; i < statArrayMaxLength; i++ {
			fmt.Println("index", i)
			parseStatOverWriteLine(g, mStatLine, i, strings.ToLower(gt))
			//g.dbStatOverWrite = getDBStatOverWrite(g.playerGUID, strings.ToLower(gt))
		}

		// account for new players and new statlines
		// if g.statOverWrite == 0 && g.dbStatOverWrite == 0 {
		// 	parseStatOverWriteLine(g, mStatLine, 0, strings.ToLower(gt))
		// }

		fmt.Println("---")
	}

	// Close connection to DB
	//defer conn.Close(context.Background())

	fmt.Println("Total Execution time: ", time.Since(start))
}

func parseStatOverWriteLine(g Game, mStatLine map[string][]string, arrPosition int, gt string) {

	if debugLevel == 1 {
		fmt.Println("Running fn parseStatOverWriteLine")
		fmt.Println("playerGUID", g.playerGUID, "arrPosition", arrPosition)
	}

	cleanStatLine := make(map[string][]string)
	for index, element := range mStatLine {
		//fmt.Println("index", index, "  -  arrPosition", arrPosition, "  -  element Length", len(element))
		if len(element) > 1 && arrPosition < len(element) {
			//fmt.Println("index", index, "  -  arrPosition", arrPosition, "  -  element Length", len(element))
			cleanStatLine[index] = append(cleanStatLine[index], element[arrPosition])
		} else {
			//fmt.Println(index, "prefilling this index since there isnt any data in this position...")
			cleanStatLine[index] = append(cleanStatLine[index], "0")
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

	if value, ok := mStatLine["gameID"]; ok {
		fmt.Println("gameID", value[arrPosition])
		g.gameID, err = strconv.Atoi(value[arrPosition])
		if err != nil {
			fmt.Println("Couldn't convert gameID to an int", err)
		}
	} else {
		fmt.Println("No gameID found!")
		g.gameID = 0
	}

	if debugLevel >= 2 {
		// log the game struct
		fmt.Println(g)
	}

	// Check if we need to create a new game record
	checkGameRecord(g)

	if checkGameEntryForPlayer(g) == false && g.gameID != 0 {
		fmt.Println("does not exist, add")
		// insert game stat
		addPlayerGameStat(g, strings.ToLower(gt))
	}

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

func checkGameRecord(g Game) {
	check := rowExists("select game_id from games where game_id = $1 and map = $2", g.gameID, g.gameMap)
	if !check {
		createGame(g)
	} else {
		fmt.Println("Game Record ", g.gameID, g.gameMap, " already exists")
	}
}
func createGame(g Game) {
	fmt.Println("Creating new Game ", g.gameMap, g.gameID, g.dateStamp, g.gameType)

	if g.gameID != 0 {
		sqlInsert := `insert into games(map, game_id, datestamp, gametype) values($1,$2,$3,$4)`
		_, err := db.Exec(sqlInsert, g.gameMap, g.gameID, g.dateStamp, g.gameType)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Unable to create new game record (Possible Dupe ID): %v\n", err)
			// Don't exit - just skip this insert
			//	os.Exit(1)
		}
	}
}

func checkPlayer(g Game) {
	check := rowExists("select player_guid from players where player_guid = $1", g.playerGUID)
	if !check {
		createPlayer(genXid(), g)
	} else {
		fmt.Println("Player already exists", g.playerName)
	}
}

func checkGameEntryForPlayer(g Game) bool {
	check := rowExists("select player_guid from game_detail where player_guid = $1 and game_id = $2 and map = $3", g.playerGUID, g.gameID, g.gameMap)
	if !check {
		return false
	} else {
		fmt.Println("Game Entry ", g.gameID, g.gameMap, " already exists for ", g.playerName)
		return true
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

func getDBStatOverWrite(playerGUID int, gt string) int {
	var dbStatOverWrite, dbPlayerGUID int
	// Used to compare ingested statOverWrite to known dbStatOverWrite
	err := db.QueryRow("select player_guid, stat_overwrite_"+gt+" from players where player_guid = $1", playerGUID).Scan(&dbPlayerGUID, &dbStatOverWrite)
	if err != nil {
		fmt.Fprintf(os.Stderr, "QueryRow failed: %v\n", err)
		os.Exit(1)
	}
	return dbStatOverWrite
}

func resetDBStatOverWrite(playerGUID int, gt string) {
	sqlUpdate := `UPDATE players SET stat_overwrite_` + gt + `= 1 WHERE player_guid = $1;`
	_, err := db.Exec(sqlUpdate, playerGUID)
	if err != nil {
		panic(err)
	}
	fmt.Println("Reset player", playerGUID, "for GameType", gt)
}

func addPlayerGameStat(g Game, gt string) {

	if debugLevel == 1 {
		fmt.Println("g.dbStatOverWrite", g.dbStatOverWrite, "g.statOverWrite", g.statOverWrite)
		fmt.Println("Checking line: ", g.playerGUID, g.playerName, g.statOverWrite, g.gameMap, g.gameID, g.dateStamp, g.gameType)
	}

	if g.dateStamp != "0" {
		// Insert new stat line
		fmt.Println("New stat line!", g.playerName, g.dateStamp)
		sqlInsert := `insert into game_detail(player_guid, player_name, stat_overwrite, map, game_id, stats, datestamp, uuid, gametype) values($1,$2,$3,$4,$5,$6,$7,$8,$9)`
		_, err := db.Exec(sqlInsert, g.playerGUID, g.playerName, g.statOverWrite, g.gameMap, g.gameID, g.stats, g.dateStamp, g.uuid, g.gameType)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Unable to add player's game stat: %v\n", err)
			os.Exit(1)
		}

		// Need to update a players statOverWrite after comparison
		sqlUpdate := `UPDATE players SET stat_overwrite_` + gt + `= $2, total_games_` + gt + ` = $3 WHERE player_guid = $1;`
		_, err = db.Exec(sqlUpdate, g.playerGUID, g.statOverWrite, g.totalGames)
		if err != nil {
			panic(err)
		}
	} else {
		fmt.Println("The dateStamp looks malformed")
	}
	// else {
	// 	fmt.Println("This stat line already exists", g.playerGUID, g.playerName, g.statOverWrite, g.gameMap, g.gameID, g.dateStamp, g.gameType)
	// }
}
