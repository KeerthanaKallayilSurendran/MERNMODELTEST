import React from 'react'
import Logo from '../assets/icon.png'
import { Button } from '@mui/material'
const Nav = () => {
    return (
        <div className='h-16 px-5 py-2 bg-black flex justify-between items-center'>
            <div className='p-2'>
                <img style={{ height: "50px" }} src={Logo} alt="" />
            </div>
        </div>
    )
}

export default Nav