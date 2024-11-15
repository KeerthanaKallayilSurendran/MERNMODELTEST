import React from 'react'

function Footer() {
    return (
        <div className='w-full h-16 bg-cyan-700 flex justify-center items-center'>
            <div className='p-2 text-xl text-white cursor-pointer '><i class="fa-brands fa-facebook"></i></div>
            <div className='p-2 text-xl text-white cursor-pointer '><i class="fa-brands fa-linkedin-in"></i></div>
            <div className='p-2 text-xl text-white cursor-pointer '><i class="fa-brands fa-square-instagram"></i></div>
        </div>
    )
}

export default Footer