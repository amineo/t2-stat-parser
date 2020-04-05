'use strict'

const Database = use('Database')

class GameController {

  async index({ inertia }) {

    const pageTitle = "Last 1000 Games"
    const gamesQry = await Database.table('games')
      .distinct('game_id',
                'map',
                'stats',
                'datestamp')
      .where('game_id', '<>', 0)
      .orderBy('game_id', 'desc')
      .limit(1000)


    // prep to combine objects for each game
    let games = gamesQry



    return inertia.render('Games/Main', { pageTitle, games }, { edgeVar: 'server-variable' })
  }

}

module.exports = GameController
