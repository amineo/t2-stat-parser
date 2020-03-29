import React, { useEffect } from 'react'

import TopNav from '../Components/TopNav';
import FrameHeading from '../Components/FrameHeading'

export default function Layout({ title, children }) {
  useEffect(() => {
    document.title = title;
  }, [title])

  return (
  <>
    <TopNav />
    <FrameHeading heading={title} />
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-4 sm:px-0">
        { children }
      </div>
    </main>
  </>
  )
}



