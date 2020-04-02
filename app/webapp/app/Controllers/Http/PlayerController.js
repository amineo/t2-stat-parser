'use strict'

const Database = use('Database')

class PlayerController {

  // Main Players List
  async index({ inertia }) {
    const pageTitle = "All Players"
    const players = await Database.table('players')
      .distinct('player_guid',
                'player_name',
                'total_games_ctfgame',
                'total_games_dmgame',
                'total_games_lakrabbitgame',
                'total_games_sctfgame',
                'updated_at')
      .groupBy('player_guid')
      .orderBy('player_name', 'asc')
      .limit(2500)

    return inertia.render('Players/Main', { pageTitle, players }, { edgeVar: 'server-variable' })
  }

  // Player Detail
  async player({ inertia, request }) {
    const playerInfo = await Database.from('players')
                            .distinct('player_guid',
                                      'player_name',
                                      'total_games_ctfgame',
                                      'total_games_dmgame',
                                      'total_games_lakrabbitgame',
                                      'total_games_sctfgame')
                            .where({ player_guid: request.params.player_guid })


    const playerStatData = await Database.from('games')
                                .select('game_id',
                                        'stats')
                                .where({ player_guid: request.params.player_guid })


      // Dynamically generate and sum the stats object
      let playerStatTotals = {},
          statKeys = Object.keys(playerStatData[0].stats)

      for(let i = 0 ; i < statKeys.length; i++) {
        if(statKeys[i] === "map" ||
          statKeys[i] === "dateStamp" ||
          statKeys[i] === "timeDayMonth" ){continue;}
        playerStatTotals[statKeys[i]] = 0;
    }

    // Loop through the playerStatsData query from the DB
    playerStatData.map(statLine => {
      // look through each object in playerStatsData array
      for (let [key, value] of Object.entries(statLine.stats)) {
        //  console.log(`${key}: ${value}`);
        // If the stat item exists, add it -- if not create a new key in playerStatTotals
        if(playerStatTotals.hasOwnProperty(key) === true){
          playerStatTotals[key] = playerStatTotals[key] + Number(value);
        }else{
          playerStatTotals[key] = Number(value);
        }
      }
    })


    let playerData = {
      player: playerInfo[0],
      stats: playerStatData,
      totals: playerStatTotals
    }

    const pageTitle = playerData.player.player_name
    return inertia.render('Players/Player', { pageTitle, playerData }, { edgeVar: 'server-variable' })
  }
}

module.exports = PlayerController
