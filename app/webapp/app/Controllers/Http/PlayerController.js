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
    const playerInfo = await Database.from('players').where({ player_guid: request.params.player_guid })
    const playerStatData = await Database.from('games').where({ player_guid: request.params.player_guid })

    let playerData = {
      player: playerInfo[0],
      stats: playerStatData
    }

    const pageTitle = playerData.player.player_name
    return inertia.render('Players/Player', { pageTitle, playerData }, { edgeVar: 'server-variable' })
  }
}

module.exports = PlayerController
