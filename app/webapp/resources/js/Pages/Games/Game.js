import React, {PureComponent} from 'react'
import { InertiaLink } from '@inertiajs/inertia-react'
import Layout from '@/Shared/Layout'

import {PieChart, Pie, Sector} from 'recharts'

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = props;
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
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#5850ec">{payload.name}</text>
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
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value} points`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export class TwoLevelPieChart extends PureComponent {
  state = {
    activeIndex: ((this.props.data.oScore >= this.props.data.dScore) ? 0 : 1 ),
    data: [{name: 'Offense', value: this.props.data.oScore},
           {name: 'Defense', value: this.props.data.dScore}]
  };

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    console.log(this.state.data);
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
        />
      </PieChart>
    );
  }
}


const PlayerRow = (player, index) => {

  return <li key={index}>
    <InertiaLink href={`/player/${player.player_guid}`} className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
      <div className="flex items-center px-4 py-4 sm:px-6">
        <div className="min-w-0 flex-1 flex items-center">
          <div className="min-w-0 flex-1 md:grid md:grid-cols-2 md:gap-4">
            <div>
              <div className="text-sm leading-5 font-medium text-indigo-600 truncate">{player.player_name}</div>
              <div className="mt-2 flex items-center text-sm leading-5 text-gray-500">
                <span className="truncate">Last Active:</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div>
                <div className="text-sm leading-5 text-gray-900">
                  Total Score
                </div>
                <div className="mt-2 flex items-center">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-gray-100 text-gray-800">{player.stats.score}</span>

                  {
                    (player.gametype == "CTFGame" || player.gametype == "SCtFGame") ? <TwoLevelPieChart data={{
                        oScore: Number(player.stats.offenseScore[0]),
                        dScore: Number(player.stats.defenseScore[0])}
                      }/>
                    : ''
                  }
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
}



export default function Game(props) {
  return (
    <Layout title={props.pageTitle}>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul>
          { props.gameInfo.map((game, index) => PlayerRow(game, index)) }
        </ul>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
       <div className="py-10 px-10"><code> {JSON.stringify(props.gameInfo)}</code></div>
      </div>
    </Layout>
  )
}
