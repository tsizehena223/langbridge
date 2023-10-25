import React from 'react'
import WorldIllustration from '../../assets/world.svg'

const Landing = () => {
  return (
  <div 
    className="
        w-screen h-screen px-4 relative flex items-center justify-center
        max-w-6xl flex-col-reverse sm:flex-row"
    >
    <div className='flex flex-col items-center sm:items-start space-y-6'>
        <h2 className='font-extrabold text-5xl sm:justify-start'>Welcome to 
            <span className='text-purple'> LangBridge</span>
        </h2>
        <p className='leading-7 text-center sm:text-start font-medium'>
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
    <div>
        <img src={WorldIllustration} alt="Illustration" className='w-auto' />
    </div>
  </div>
  )
}

export default Landing