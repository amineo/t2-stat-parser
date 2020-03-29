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
        <div>{JSON.stringify(props.playerData.player)}</div>
       <div> {JSON.stringify(props.playerData.stats)}</div>
      </div>
    </Layout>
  )
}
