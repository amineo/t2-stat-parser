import React from 'react'

const returnTotalSumGames = (player) => {
  let sum = Number(player.ctf) +
            Number(player.dm) +
            Number(player.lak) +
            Number(player.spawnctf);
  return sum
};

const GameTypesPlayedCols = (props) => {
  return (
    <>
    <dl className="grid grid-cols-1 col-gap-4 row-gap-8 sm:grid-cols-4">
    <div className="sm:col-span-1">
    <dt className="text-sm leading-5 font-medium text-gray-500">
    CTF
    </dt>
    <dd className="mt-1 text-sm leading-5 text-gray-900">
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-gray-100 text-gray-800">{props.ctf} </span>
    </dd>
  </div><div className="sm:col-span-1">
    <dt className="text-sm leading-5 font-medium text-gray-500">
    LAK Rabbit
    </dt>
    <dd className="mt-1 text-sm leading-5 text-gray-900">
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-gray-100 text-gray-800">{props.lak}</span>
    </dd>
  </div><div className="sm:col-span-1">
    <dt className="text-sm leading-5 font-medium text-gray-500">
    Spawn CTF
    </dt>
    <dd className="mt-1 text-sm leading-5 text-gray-900">
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-gray-100 text-gray-800">{props.spawnctf}</span>
    </dd>
  </div><div className="sm:col-span-1">
    <dt className="text-sm leading-5 font-medium text-gray-500">
      Deathmatch
    </dt>
    <dd className="mt-1 text-sm leading-5 text-gray-900">
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-gray-100 text-gray-800">{props.dm}</span>
    </dd>
  </div>
    </dl>
    <div className="mt-5">
    <dt className="text-sm leading-5 font-medium text-gray-500">
      Total 
    </dt>
    <dd className="mt-1 text-sm leading-5 text-gray-900">
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-gray-100 text-gray-800">{returnTotalSumGames(props)}</span>
    </dd>
    </div>

    </>
  );
};

export default GameTypesPlayedCols;
