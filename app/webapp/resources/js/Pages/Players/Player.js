import React from 'react'

import Layout from '@/Shared/Layout'
import GameTypesPlayedBoxes from '@/Components/GameTypesPlayedBoxes'




export default function Player(props) {
  return (
    <Layout title={props.pageTitle}>

      <GameTypesPlayedBoxes ctf={props.playerData.player.total_games_ctfgame}
                            dm={props.playerData.player.total_games_dmgame}
                            lak={props.playerData.player.total_games_lakrabbitgame}
                            spawnctf={props.playerData.player.total_games_sctfgame}
      />

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="py-10 px-10">{JSON.stringify(props.playerData.totals)}</div>
       <div className="py-10 px-10"><code> {JSON.stringify(props.playerData.stats)}</code></div>
      </div>
    </Layout>
  )
}
