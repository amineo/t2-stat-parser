import React from 'react'

const returnTotalSumGames = (player) => {
  let sum = Number(player.ctf) +
            Number(player.dm) +
            Number(player.lak) +
            Number(player.spawnctf);
  return sum
};

const GameTypesPlayedBoxes = (props) => {
  return (
    <div>
      <h3 className="text-md leading-6 font-medium text-gray-900">
        Games Played {returnTotalSumGames(props)}
      </h3>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dl>
              <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                Capture the Flag
              </dt>
              <dd className="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                {props.ctf}
              </dd>
            </dl>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dl>
              <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                LAK Rabbit
              </dt>
              <dd className="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                {props.lak}
              </dd>
            </dl>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dl>
              <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                Spawn CTF
              </dt>
              <dd className="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                {props.spawnctf}
              </dd>
            </dl>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dl>
              <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                Deathmatch
              </dt>
              <dd className="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                {props.dm}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameTypesPlayedBoxes;
