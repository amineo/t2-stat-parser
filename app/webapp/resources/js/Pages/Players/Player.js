import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import GameTypesPlayedCols from '@/Components/GameTypesPlayedCols';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const returnWeaponTotals = (statTotals) => {
	let totals = [
		{ weapon: 'Chaingun', val: statTotals['cgKillsTG'] },
		{ weapon: 'Disc', val: statTotals['discKillsTG'] },
		{ weapon: 'Grenade Launcher', val: statTotals['grenadeKillsTG'] },
		{ weapon: 'Shocklance', val: statTotals['shockKillsTG'] },
		{ weapon: 'Laser Rifle', val: statTotals['laserKillsTG'] },
		{ weapon: 'Blaster', val: statTotals['blasterKillsTG'] },
		{ weapon: 'Plasma Rifle', val: statTotals['plasmaKillsTG'] },
		{ weapon: 'Mortar Launcher', val: statTotals['mortarKillsTG'] },
		{ weapon: 'Missile Launcher', val: statTotals['missileKillsTG'] },
		{ weapon: 'Hand Grenade', val: statTotals['hGrenadeKillsTG'] },
		{ weapon: 'Mine', val: statTotals['mineKillsTG'] },
		{ weapon: 'Satchel', val: statTotals['satchelKillsTG'] }
	];

	// dont return if the val is 0
	return totals.filter(function(el) {
		return el.val > 0;
	});
};

const GameCard = (player, index) => {
	// only display card if player has score
	// if (Number(player.stats.score) <= 0){return}

	return (
		<div key={index} className="bg-white shadow overflow-hidden sm:rounded-lg mb-5">
			<div className="px-4 py-5 border-b border-gray-200 sm:px-6">
				<div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-no-wrap">
					<div className="ml-4 mt-4">
						<h3 className="text-lg leading-6 font-medium text-gray-900">
							<InertiaLink
								href={`/game/${player.game_id}`}
								className="text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out"
							>
								{player.stats.map}
							</InertiaLink>
						</h3>

						<p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
							<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-gray-100 text-gray-800">
								{player.stats.dateStamp}
							</span>
						</p>
					</div>
					<div className="ml-4 mt-4 flex-shrink-0">
						<span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-indigo-100 text-indigo-800">
							{player.gametype}
						</span>
					</div>
				</div>
			</div>
			<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
				<dt className="text-sm leading-5 font-medium text-gray-500">Total Score</dt>
				<dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">{player.stats.scoreTG}</dd>
			</div>
			<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
				<dt className="text-sm leading-5 font-medium text-gray-500">Kills / Assists</dt>
				<dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
					{player.stats.killsTG} / {player.stats.assistTG}
				</dd>
			</div>
			<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
				<dt className="text-sm leading-5 font-medium text-gray-500">MAs</dt>
				<dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">{player.stats.totalMATG}</dd>
			</div>
			<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
				<dt className="text-sm leading-5 font-medium text-gray-500">Flag Grabs / Caps</dt>
				<dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
					{player.stats.flagGrabsTG} / {player.stats.flagCapsTG}
				</dd>
			</div>
			<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
				<dt className="text-sm leading-5 font-medium text-gray-500">Flag Defends / Carrier Kills / Returns</dt>
				<dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
					{player.stats.flagDefendsTG} / {player.stats.carrierKillsTG} / {player.stats.flagReturnsTG}
				</dd>
			</div>
		</div>
	);
};

export default function Player(props) {
	return (
		<Layout title={props.pageTitle}>
			<div className="md:grid md:grid-cols-4 md:gap-6">
				<div className="md:col-span-1">
					<div className="px-4 sm:px-0">
						<h3 className="text-lg font-medium leading-6 text-gray-900">Aggregate</h3>
						<p className="mt-1 text-sm leading-5 text-gray-500">Stat Totals</p>
					</div>
				</div>

				<div className="mt-5 md:mt-0 md:col-span-3">
					<div className="bg-white shadow overflow-hidden sm:rounded-lg">
						<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<div className="text-sm leading-5 font-medium text-gray-500">Games Played</div>
							<div className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
								<GameTypesPlayedCols
									ctf={props.playerData.player.total_games_ctfgame}
									dm={props.playerData.player.total_games_dmgame}
									lak={props.playerData.player.total_games_lakrabbitgame}
									spawnctf={props.playerData.player.total_games_sctfgame}
								/>
							</div>
						</div>
						<div className="bg-gray-50 px-4 py-5">
							<dt className="text-sm leading-5 font-medium text-gray-500">Weapon Usage</dt>
							<dd className="mt-1 text-sm leading-5 text-gray-900 flex items-center justify-center">
								<RadarChart
									cx={300}
									cy={250}
									outerRadius={150}
									width={600}
									height={500}
									data={
										returnWeaponTotals(props.playerData.totals).length ? (
											returnWeaponTotals(props.playerData.totals)
										) : (
											[ { weapon: 'No Data', val: 1 } ]
										)
									}
									className="text-xs"
								>
									<PolarGrid />
									<PolarAngleAxis dataKey="weapon" />
									<PolarRadiusAxis />
									<Radar
										name={props.playerData.player.player_name}
										dataKey="val"
										stroke="#8884d8"
										fill="#8884d8"
										fillOpacity={0.6}
									/>
								</RadarChart>
							</dd>
						</div>
					</div>
				</div>
			</div>

			<div className="md:grid md:grid-cols-4 md:gap-6 mt-10">
				<div className="md:col-span-1">
					<div className="px-4 sm:px-0">
						<h3 className="text-lg font-medium leading-6 text-gray-900">Game History</h3>
						<p className="mt-1 text-sm leading-5 text-gray-500">
							Stats for past {props.playerData.stats.length} games
						</p>
					</div>
				</div>
				<div className="mt-5 md:mt-0 md:col-span-3">
					{props.playerData.stats.map((player, index) => GameCard(player, index))}
				</div>
			</div>
			{/*

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
       <div className="py-10 px-10"><code> {JSON.stringify(props.playerData.stats)}</code></div>
      </div> */}
		</Layout>
	);
}
