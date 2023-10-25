import React from 'react'
import WorldIllustration from '../../assets/world.svg'

const Landing = () => {
  return (
  <div className="w-screen h-screen px-4 relative flex xl:flex-col items-center justify-center">
    <div className="max-w-6xl flex flex-col-reverse items-center sm:flex-row">
      <div className="flex flex-col items-center sm:items-start">
        <h2 className="mb-4 font-extrabold text-5xl dark:text-light">Welcome to 
          <span className='text-purple'> LangBridge</span>
        </h2>
        <p className="leading-7 text-center font-normal text-lg sm:text-start dark:text-light">
          Let language be the bridge that connects you to endless possibilities
          and lifelong connections. Welcome to LangBridge, where the world
          becomes your classroom.
        </p>
        <a
          href="#section-a"
          className="mt-4 py-3 px-6 rounded-md font-semibold text-light bg-purple hover:bg-green"
        >
          Get started
        </a>
      </div>
        <img src={WorldIllustration} alt="World illustration" className="w-96" />
    </div>
  </div>
  )
}

export default Landing