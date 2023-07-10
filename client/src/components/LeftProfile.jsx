import React from 'react'
import { FaUserEdit } from "react-icons/fa"
import { MdSecurity } from "react-icons/md"
import MenuItem from './MenuItem'

function LeftProfile() {
  return (
    <div className='space-y-8'>
        <div>
            <MenuItem icon={FaUserEdit} label="EditProfile" />
        </div>
        <div>
            <MenuItem icon={MdSecurity} label="Security" />
        </div>
        <div>
            <MenuItem icon={MdSecurity} label="Security" />
        </div>
        <div>
            <MenuItem icon={MdSecurity} label="Security" />
        </div>
        <div>
            <MenuItem icon={MdSecurity} label="Security" />
        </div>
        <div>
            <MenuItem icon={MdSecurity} label="Security" />
        </div>
        <div>
            <MenuItem icon={MdSecurity} label="Security" />
        </div>
        <div>
            <MenuItem icon={MdSecurity} label="Security" />
        </div>
    </div>
  )
}

export default LeftProfile