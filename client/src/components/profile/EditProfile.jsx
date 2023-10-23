import React from 'react';
import Avatar from "../../assets/avatar.svg";
import { useRef, useState } from 'react';
import Info from "../../assets/info-pers.svg";
import FormInput from "../form/FormInput";
import { RiEditLine } from "react-icons/ri";
import { editFields } from "../../static/form-fields";
import MenuItem from '../common/MenuItem';

const EditProfile = () => {
    const inputRef = useRef(null);
    const [image, setImage] = useState("");

    const handleImageClick = () => {
        inputRef.current.click();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        console.log(file);
        setImage(event.target.files[0]);
    };  

    const [formData, setFormData] = useState({
        username: "",
        country: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };
    
    return (
        <div className="space-y-4 w-full p-8 h-full">
            <h1 className="font-semibold text-3xl text-blue dark:text-purple">Account Setting</h1>
            <div className="bg-light p-8 rounded-xl dark:bg-gray-2">
                <center className="p-4">
                    {image ? (
                        <img 
                            className="w-44 h-44 flex justify-center items-center rounded-full border-solid border-2 border-dark"
                            src={URL.createObjectURL(image)}
                            alt=""
                        />
                    ) : (
                        <img 
                            
                            className="w-44 h-44" src={Avatar} alt="YouProfile" 
                        />
                    )}
                    <button className="absolute" onClick={handleImageClick}>
                        <MenuItem icon={RiEditLine} />
                    </button>
        
                </center>
                <input
                    type="file"
                    ref={inputRef}
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                    accept="image/*"
                />

                <div className='flex justify-between p-4'>
                    <div className='w-1/2 inline-block space-x-4'>
                        <form
                        >
                            {editFields.map((field, key) => {
                                const value = formData[field.name];
                                return (
                                    <div key={key} className="mb-2">
                                    <label htmlFor="" className="font-semibold text-gray-1 dark:text-light">{field.label}</label>
                                    {(
                                        <FormInput
                                            icon={field.icon}
                                            name={field.name}
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            value={value}
                                            onChange={handleChange}
                                        />
                                    )}
                                </div>
                                );
                            })}
                            
                            <button
                                type="submit"
                                className="mt-6 mb-3 py-2 px-6 rounded-md flex-wrap
                                text-light bg-purple hover:bg-green"
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>

                    <div className='items-center justify-center h-full'>
                        <img className="" src={Info} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile