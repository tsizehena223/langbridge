import React from 'react'
import Avatar from "../assets/avatar.svg"
import { useRef, useState } from 'react'
import { FaPencil } from "react-icons/fa6"
import MenuItem from './MenuItem';
import Mail from "../assets/e-mail.svg"
import Info from "../assets/info-pers.svg"
import FormInput from './FormInput';

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
        <h1 className='font-semibold text-3xl text-blue'>Account Setting</h1>
        <div className='bg-gray-0 p-8 flex justify-between rounded-xl'>
            <div className='flex space-x-4'>
                { image ? 
                    (<img className='w-28 h-28 rounded-full border-solid border-2 border-dark' src={URL.createObjectURL(image)} alt='' />) : 
                    (<img className='w-28 h-28 ' src={Avatar} alt='YouProfile' />) }
                <div className='space-y-3'>
                    <p className='font-semibold text-purple'>User Name</p>
                    <p className='font-normal text-placeholder'>Nationality</p>
                    <p className='font-normal text-placeholder'>Country</p>

                </div>
            </div>
            <input type="file" ref={inputRef} onChange={handleImageChange} style={{display:'none'}} accept='image/*' />
            <button onClick={handleImageClick} className=''><MenuItem icon={FaPencil} label="Edit"/></button>
        </div>
        <div className='bg-gray-0 p-8 rounded-xl space-y-2'>
            <h1 className='text-purple font-bold'>Personnal Information</h1>
            <div className='flex justify-between'>
                <div className='flex justify-between pl-4'>
                    <div className='w-1/2 space-y-2'>
                        <div>
                            <h1 className='font-semibold text-gray-1' >First Name:</h1>
                            <FormInput
                                    name="firstName"
                                    type="text"
                                    placeholder="First Name"
                            />
                        </div>
                        <div>
                            <h1 className='font-semibold text-gray-1' >Last Name:</h1>
                            <FormInput
                                name="lastName"
                                type="text"
                                placeholder="Last Name"
                            />
                        </div>
                        <div>
                            <h1 className='font-semibold text-gray-1' >E-mail Adress:</h1>
                            <FormInput
                                name="eMail"
                                type="text"
                                placeholder="E-mail Adress"
                            />
                        </div>
                        <div>
                            <h1 className='font-semibold text-gray-1' >Bio:</h1>
                            <FormInput
                                name="bio"
                                type="text"
                                placeholder="Describe Yourself"
                            />
                        </div>
                    </div>

                    <div>
                        <img className='' src={Info} alt="" />
                    </div>
                </div>
            </div>
        </div>
        <div className='bg-gray-0 p-8 rounded-xl space-y-2'>
            <h1 className='text-purple font-bold'>Adress</h1>
            <div className='flex justify-between'>
                <div className='flex justify-between pl-4'>
                    <div className='w-1/2 h-full'>
                        <img className='' src={Mail} alt="" />
                    </div>
                    <div className='w-1/2 space-y-2'>
                        <div>
                            <h1 className='font-semibold text-gray-1' >Country:</h1>
                            <FormInput
                                    name="country"
                                    type="text"
                                    placeholder="Country Name"
                            />
                        </div>
                        <div>
                            <h1 className='font-semibold text-gray-1' >City/state:</h1>
                            <FormInput
                                name="city"
                                type="text"
                                placeholder="City/State"
                            />
                        </div>
                        <div>
                            <h1 className='font-semibold text-gray-1' >Phone Number:</h1>
                            <FormInput
                                name="numPhone"
                                type="number"
                                placeholder="Phone Number"
                            />
                        </div>
                        <div>
                            <h1 className='font-semibold text-gray-1' >Postal Code:</h1>
                            <FormInput
                                name="code"
                                type="text"
                                placeholder="Postal Code"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default RightProfile