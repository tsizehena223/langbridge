import React from 'react'
import BookIllustration  from '../../assets/book.svg'

const Section3 = () => {
  return (
<div className="max-w-5xl mt-32 flex flex-col items-center sm:flex-row dark:text-light">
    <div className="flex flex-col items-center sm:items-start">
      <h2 className="mb-2 font-bold text-3xl">Learn new cultures</h2>
      <p className="mb-4 leading-7 text-center sm:text-start">
        Embark on a fascinating journey of discovery as you dive into the
        world of learning new cultures. Our language learning platform
        provides you with a gateway to explore the rich tapestry of diverse
        cultures from around the globe
      </p>
    </div>
    <img
      src={BookIllustration}
      className="w-3/4 sm:ml-10"
    />
  </div>
  )
}

export default Section3