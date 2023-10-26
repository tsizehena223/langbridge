import React from 'react'
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from 'react-icons/ri'
import { useRef, useState } from 'react';

import image1 from '../../assets/flags/fr.svg';
import image2 from '../../assets/flags/mg.svg';
import image3 from '../../assets/flags/us.svg';
import image4 from '../../assets/flags/arab.svg';
import image5 from '../../assets/flags/ci.svg';
import image6 from '../../assets/flags/ru.svg';
import image7 from '../../assets/flags/gb-eng.svg';
import image8 from '../../assets/flags/jp.svg';
import image9 from '../../assets/flags/es.svg';
import image10 from '../../assets/flags/ca.svg';
import image11 from '../../assets/flags/md.svg';
import image12 from '../../assets/flags/af.svg';
import image13 from '../../assets/flags/by.svg';


const Section1 = () => {
  return (
    <div id="section-a" className="flex flex-col-reverse items-center h-screen justify-center dark:text-light">
      <div className='mt-36 max-w-6xl flex-col-reverse items-center sm:flex-row justify-center'>
        <h2 className="mb-2 font-bold text-3xl">Learn new cultures</h2>
          <p className="mb-4 leading-7 text-center sm:text-start">
            Embark on a fascinating journey of discovery as you dive into the
            world of learning new cultures. Our language learning platform
            provides you with a gateway to explore the rich tapestry of diverse
            cultures from around the globe
          </p>
      </div>
      <div className='flex space-x-10 items-center justify-center'>
        <img className='w-20 h-20 rounded-full' src={image1} alt="" />
        <img className='w-20 h-20 rounded-full' src={image2} alt="" />
        <img className='w-20 h-20 rounded-full' src={image3} alt="" />
        <img className='w-20 h-20 rounded-full' src={image4} alt="" />
        <img className='w-20 h-20 rounded-full' src={image5} alt="" />
        <img className='w-20 h-20 rounded-full' src={image6} alt="" />
        <img className='w-20 h-20 rounded-full' src={image7} alt="" />
        <img className='w-20 h-20 rounded-full' src={image8} alt="" />
        <img className='w-20 h-20 rounded-full' src={image9} alt="" />
        <img className='w-20 h-20 rounded-full' src={image10} alt="" />
        <img className='w-20 h-20 rounded-full' src={image11} alt="" />
        <img className='w-20 h-20 rounded-full' src={image12} alt="" />
        <img className='w-20 h-20 rounded-full' src={image13} alt="" />
      </div>
    </div>
  )
}

export default Section1