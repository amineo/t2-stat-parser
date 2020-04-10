import React from 'react'

const FrameHeading = (props) => {
  return (
  <header className="bg-white shadow-sm">
    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <h1 className="text-lg leading-6 font-semibold text-gray-900">
        {props.heading}
      </h1>
      { props.gametype ? props.gametype : ''}
    </div>
  </header>
  );
};

export default FrameHeading;
