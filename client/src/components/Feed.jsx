import React from 'react'
import Avatar from "../assets/avatar.svg"
import { FaImage, FaCamera, FaLink, FaLocationDot, FaFaceSmile, FaPencil } from "react-icons/fa6"
import { IoSendSharp } from "react-icons/io5"
import MenuItem from './MenuItem'

const Feed = () => {
  return (
    <div className='w-full p-6'>
      <div className='space-y-4'>
        <div className='flex space-x-2'>
          <img src={Avatar} className="w-9 h-9" />
          <input
            type="post"
            placeholder="What's on your mind...."
            size={65}
            // value={inputValue}
            // onFocus={() => setIsInputFocused(true)}
            // onBlur={() => setIsInputFocused(false)}
            // onChange={(e) => setInputValue(e.target.value)}
            className="py-2 pl-10 border-2 border-light rounded-xl font-semibold text-gray-1 focus:outline-none focus:border-purple focus:text-purple focus:placeholder:text-purple"
          />
        </div>
        <div className='flex justify-between'>
          <div className='flex space-x-4'>
            <MenuItem icon={FaCamera}/>
            <MenuItem icon={FaImage}/>
            <MenuItem icon={FaLink}/>
            <MenuItem icon={FaLocationDot}/>
            <MenuItem icon={FaFaceSmile}/>
          </div>
          <div className='flex space-x-4'>
            <MenuItem icon={FaPencil} label="Draft" />
            <MenuItem icon={IoSendSharp} label="Post" />
          </div>
        </div>
      </div>
      <div>

      </div>
    </div>
  )
}

export default Feed