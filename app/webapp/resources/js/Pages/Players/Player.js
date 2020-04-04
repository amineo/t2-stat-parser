import React from 'react'

import Layout from '@/Shared/Layout'
import GameTypesPlayedBoxes from '@/Components/GameTypesPlayedBoxes'

import {Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis} from 'recharts'


const returnWeaponTotals = (statTotals) => {
  let totals = [
      { weapon: 'Chaingun', val: statTotals["chainKills"]},
      { weapon: 'Disc', val: statTotals["discKills"] },
      { weapon: 'Grenade Launcher', val: statTotals["grenadeKills"]},
      { weapon: 'Shocklance', val: statTotals["shockLanceKills"]},
      { weapon: 'Laser Rifle', val: statTotals["laserKills"]},
      { weapon: 'Blaster', val: statTotals["blasterKills"]},
      { weapon: 'Plasma Rifle', val: statTotals["plasmaKills"]},
      { weapon: 'Mortar Launcher', val: statTotals["mortarKills"]},
      { weapon: 'Missile Launcher', val: statTotals["missileKills"]},
      { weapon: 'Hand Grenade', val: statTotals["hGrenadeKills"]},
      { weapon: 'Mine', val: statTotals["mineKills"]},
      { weapon: 'Satchel', val: statTotals["satchelChargeKills"]},
    ];

    // dont return if the val is 0
    return totals.filter(function (el) {
      return el.val > 0;
    });
};






export default function Player(props) {
  return (
    <Layout title={props.pageTitle}>

      <GameTypesPlayedBoxes ctf={props.playerData.player.total_games_ctfgame}
                            dm={props.playerData.player.total_games_dmgame}
                            lak={props.playerData.player.total_games_lakrabbitgame}
                            spawnctf={props.playerData.player.total_games_sctfgame}
      />

      <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={returnWeaponTotals(props.playerData.totals)} className="text-sm">
        <PolarGrid />
        <PolarAngleAxis dataKey="weapon" />
        <PolarRadiusAxis/>
        <Radar name={props.playerData.player.player_name} dataKey="val" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
      </RadarChart>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="py-10 px-10">{JSON.stringify(props.playerData.totals)}</div>
       <div className="py-10 px-10"><code> {JSON.stringify(props.playerData.stats)}</code></div>
      </div>
    </Layout>
  )
}
