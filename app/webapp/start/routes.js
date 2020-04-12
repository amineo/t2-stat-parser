'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// [ Routes ]
//Route.get('/', 'IndexController.index').as('home')
//temp set games as home
Route.get('/', 'GameController.index').as('home')

// [ player ]
Route.get('/players', 'PlayerController.index')
Route.get('/player/:player_guid',  'PlayerController.player')

// [ game ]
Route.get('/games', 'GameController.index')
Route.get('/game/:game_id', 'GameController.game')



// Container Healthcheck route
Route.get('/healthz', () => {
  return { status: "healthy" };
})
