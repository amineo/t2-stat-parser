import React from 'react'
import { InertiaLink } from '@inertiajs/inertia-react'


const navItems = () =>
  <div className="ml-10 flex items-baseline">
    <InertiaLink href="/" className="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700">Home</InertiaLink>
    <InertiaLink href="/games" className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Games</InertiaLink>
    <InertiaLink href="/players" className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Players</InertiaLink>
  </div>;

const TopNav = () => {
  return (
  <nav data-todo-x-data="{ open: false }" data-todo-at-keydown-window-escape="open = false" className="bg-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img className="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-on-dark.svg" alt="Workflow logo" />
          </div>
          <div className="hidden md:block">
            { navItems() }
          </div>
        </div>
        <div className="hidden md:block">
          <div className="ml-4 flex items-center md:ml-6">
            <div data-todo-at-click-away="open = false" className="ml-3 relative" data-todo-x-data="{ open: false }">
            <span className="inline-flex rounded-md shadow-sm">
              <button type="button" className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                Discord
              </button>
            </span>
            </div>
          </div>
        </div>
        {/* {Mobile nav} */}
        <div className="-mr-2 flex md:hidden">
          <button data-todo-at-click="open = !open" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white" data-todo-x-bind-aria-label="open ? 'Close main menu' data-todo-colon- 'Main menu'" data-todo-x-bind-aria-expanded="open">
            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path data-todo-colon-className="{'hidden': open, 'inline-flex': !open }" className="inline-flex" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              <path data-todo-colon-className="{'hidden': !open, 'inline-flex': open }" className="hidden" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div data-todo-colon-className="{'block': open, 'hidden': !open}" className="hidden md:hidden">
      <div className="px-2 pt-2 pb-3 sm:px-3">
        { navItems() }
      </div>
    </div>
  </nav>
  );
};

export default TopNav;
