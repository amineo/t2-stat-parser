import React from 'react'
import { InertiaLink } from '@inertiajs/inertia-react'
import Layout from '@/Shared/Layout'

const returnTotalSumGames = (player) => {
  let sum = Number(player.total_games_ctfgame) +
            Number(player.total_games_dmgame) +
            Number(player.total_games_lakrabbitgame) +
            Number(player.total_games_sctfgame);
  return sum
};


const PlayerRow = (player, index) =>
  <li key={index}>
  <InertiaLink href={`/player/${player.player_guid}`} className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
    <div className="flex items-center px-4 py-4 sm:px-6">
      <div className="min-w-0 flex-1 flex items-center">
        <div className="min-w-0 flex-1 md:grid md:grid-cols-2 md:gap-4">
          <div>
            <div className="text-sm leading-5 font-medium text-indigo-600 truncate">{player.player_name}</div>
            <div className="mt-2 flex items-center text-sm leading-5 text-gray-500">
              <span className="truncate">Last Active: {player.updated_at.split(/[T]/)[0]}</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div>
              <div className="text-sm leading-5 text-gray-900">
                Total Games Played
              </div>
              <div className="mt-2 flex items-center">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-gray-100 text-gray-800">{ returnTotalSumGames(player) }</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
        </svg>
      </div>
    </div>
  </InertiaLink>
  </li>;



export default function Players(props) {
  return (
    <Layout title={props.pageTitle}>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul>
          { props.players.map((player, index) => PlayerRow(player, index)) }
        </ul>
      </div>
    </Layout>
  )
}
