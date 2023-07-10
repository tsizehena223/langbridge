import React from 'react'
import Avatar from "../assets/avatar.svg"
import { useRef, useState } from 'react'
import { FaPencil } from "react-icons/fa6"
import MenuItem from './MenuItem';
import Mail from "../assets/e-mail.svg"
import Info from "../assets/info-pers.svg"

function RightProfile() {
    const inputRef= useRef(null);
    const [image, setImage]= useState("");

    const handleImageClick= () => {
        inputRef.current.click();
    };

    const handleImageChange= (event) => {
        const file= event.target.files[0];
        console.log(file);
        setImage(event.target.files[0]);
    };

  return (
    <div className='space-y-4'>
        <h1>Account Setting</h1>
        <div className='bg-gray-0 p-8 flex justify-between rounded-xl'>
            <div className='flex space-x-4'>
                { image ? 
                    (<img className='w-28 h-28 rounded-full border-solid border-2 border-dark' src={URL.createObjectURL(image)} alt='' />) : 
                    (<img className='w-28 h-28 ' src={Avatar} alt='YouProfile' />) }
                <div className='space-y-3'>
                    <div>User Name</div>
                    <div>Nationality</div>
                    <div>Bio</div>
                </div>
            </div>
            <input type="file" ref={inputRef} onChange={handleImageChange} style={{display:'none'}} />
            <button onClick={handleImageClick} className=''><MenuItem icon={FaPencil} label="Edit"/></button>
        </div>
        <div className='bg-gray-0 p-8 flex justify-between rounded-xl'>
            <h1>Personnal Information</h1>
            <div className='flex justify-between'>
                <div>

                </div>

                <div>
                    <img className='' src={Info} alt="" />
                </div>
            </div>
        </div><div className='bg-gray-0 p-8 flex justify-between rounded-xl'>
            <h1>Adress</h1>
            <div className='flex justify-between'>
                <div>
                    <img src={Mail} alt="" />
                </div>

                <div>
                    jhyfghhbkugukj
                </div>
            </div>
        </div>
    </div>
  )
}

export default RightProfile