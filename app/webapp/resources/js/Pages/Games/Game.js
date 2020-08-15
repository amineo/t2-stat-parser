import React, { PureComponent } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';

import { PieChart, Pie, Sector } from 'recharts';

const renderActiveShape = (props) => {
	const RADIAN = Math.PI / 180;
	const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
	const sin = Math.sin(-RADIAN * midAngle);
	const cos = Math.cos(-RADIAN * midAngle);
	const sx = cx + (outerRadius + 10) * cos;
	const sy = cy + (outerRadius + 10) * sin;
	const mx = cx + (outerRadius + 30) * cos;
	const my = cy + (outerRadius + 30) * sin;
	const ex = mx + (cos >= 0 ? 1 : -1) * 22;
	const ey = my;
	const textAnchor = cos >= 0 ? 'start' : 'end';

	return (
		<g>
			<text x={cx} y={cy} dy={8} textAnchor="middle" fill="#5850ec">
				{payload.name}
			</text>
			<Sector
				cx={cx}
				cy={cy}
				innerRadius={innerRadius}
				outerRadius={outerRadius}
				startAngle={startAngle}
				endAngle={endAngle}
				fill="#8884d8"
			/>
			<Sector
				cx={cx}
				cy={cy}
				startAngle={startAngle}
				endAngle={endAngle}
				innerRadius={outerRadius + 6}
				outerRadius={outerRadius + 10}
				fill="#6761d6"
			/>
			<path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
			<circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
			<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value}`}</text>
			<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
				{`(${(percent * 100).toFixed(2)}%)`}
			</text>
		</g>
	);
};

export class TwoLevelPieChart extends PureComponent {
	state = {
		activeIndex: this.props.data.oScore >= this.props.data.dScore ? 0 : 1,
		data: [ { name: 'Offense', value: this.props.data.oScore }, { name: 'Defense', value: this.props.data.dScore } ]
	};

	onPieEnter = (data, index) => {
		this.setState({
			activeIndex: index
		});
	};

	render() {
		return (
			<PieChart width={400} height={400}>
				<Pie
					activeIndex={this.state.activeIndex}
					activeShape={renderActiveShape}
					data={this.state.data}
					cx={200}
					cy={200}
					innerRadius={60}
					outerRadius={80}
					fill="#ccc"
					dataKey="value"
					onMouseEnter={this.onPieEnter}
					className="text-xs"
				/>
			</PieChart>
		);
	}
}

const PlayerRow = (player, index) => {
	// dont show scoreless players
	// if (Number(player.stats.scoreTG) <= 0) {
	// 	return;
	// }

	return (
		<div className="flex flex-col rounded-lg shadow-lg overflow-hidden" key={index}>
			<div className="bg-white shadow overflow-hidden sm:rounded-lg">
				<div className="px-4 py-5 border-b border-gray-200 sm:px-6">
					<h3 className="text-lg leading-6 font-medium">
						<InertiaLink
							href={`/player/${player.player_guid}`}
							className="text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out"
						>
							{player.player_name}
						</InertiaLink>
					</h3>
				</div>
				<div>
					<dl>
						<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm leading-5 font-medium text-gray-500">Total Score</dt>
							<dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
								{player.stats.scoreTG}
							</dd>
						</div>
						<div className="bg-gray-50 flex items-center justify-center">
							{player.gametype == 'CTFGame' || player.gametype == 'SCtFGame' ? (
								<TwoLevelPieChart
									data={{
										oScore: Number(player.stats.offenseScoreTG[0]),
										dScore: Number(player.stats.defenseScoreTG[0])
									}}
								/>
							) : (
								''
							)}
						</div>
						<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm leading-5 font-medium text-gray-500">Kills / Assists</dt>
							<dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
								{player.stats.killsTG} / {player.stats.assistTG}
							</dd>
						</div>
						<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm leading-5 font-medium text-gray-500">MAs</dt>
							<dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
								{player.stats.totalMATG}
							</dd>
						</div>
						<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm leading-5 font-medium text-gray-500">Flag Grabs / Caps</dt>
							<dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
								{player.stats.flagGrabsTG} / {player.stats.flagCapsTG}
							</dd>
						</div>
						<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm leading-5 font-medium text-gray-500">
								Flag Defends / Capper Kills / Returns
							</dt>
							<dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
								{player.stats.flagDefendsTG} / {player.stats.carrierKillsTG} /{' '}
								{player.stats.flagReturnsTG}
							</dd>
						</div>
					</dl>
				</div>
			</div>
		</div>
	);
};

export default function Game(props) {
	return (
		<Layout title={props.pageTitle.name} gametype={props.pageTitle.gametype}>
			<div className="mt-2 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
				{props.gameInfo.map((game, index) => PlayerRow(game, index))}
			</div>
			{/*
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
       <div className="py-10 px-10"><code> {JSON.stringify(props.gameInfo)}</code></div>
      </div> */}
		</Layout>
	);
}
