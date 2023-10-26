import React from 'react'
import chat from '../../assets/begin_chat.svg'

const Section4 = () => {
  return (
<div className="max-w-5xl mt-32 flex flex-col-reverse items-center sm:flex-row">
    <img
      src={chat}
      className="w-3/4 sm:mr-10"
    />
    <div className="flex flex-col items-center sm:items-start dark:text-light">
      <h2 className="mb-2 font-bold text-3xl ">Meet people</h2>
      <p className="mb-4 leading-7 text-center sm:text-start">
        Meet people from all around the world and make new friends, find
        partners and teachers. Find native speakers and learn together by
        joining our community.
      </p>
    </div>
  </div>
  )
}

export default Section4