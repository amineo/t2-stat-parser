import React from 'react'
import { InertiaLink } from '@inertiajs/inertia-react'


const navItems = () =>
  <div className="ml-10 flex items-baseline">
    {/* <InertiaLink href="/" className="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700">Home</InertiaLink> */}
    <InertiaLink href="/games" className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Games</InertiaLink>
    <InertiaLink href="/players" className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Players</InertiaLink>
  </div>;

const TopNav = () => {
  return (
  <nav className="bg-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img className="h-8 w-8" src="https://d33wubrfki0l68.cloudfront.net/1699fc97aa9b1cb851a6c0039162a9241724e1fb/7289f/images/logo.png" alt="Tribes 2 Stats" />
          </div>
          <div className="md:block">
            { navItems() }
          </div>
        </div>
        <div className="md:block">
          <div className="ml-4 flex items-center md:ml-6">
            <span className="inline-flex rounded-md shadow-sm">
              <a href="https://www.playt2.com/discord" className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                Join Discord
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  </nav>
  );
};

export default TopNav;
