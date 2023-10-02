import React from 'react'
import {FaFacebookF,FaTwitter,FaInstagram} from "react-icons/fa"
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='flex flex-row justify-between lg:w-11/12 md:w-10/12 sm:w-9/12 mx-auto container mb-5 '>
        
        <p className="lg:text-1xl md:text-lg font-bold cursor-pointer uppercase">The Daily Blog</p>

        <ul className='flex flex-row gap-x-3  items-center cursor-pointer'>
            <li className='hover:text-sky-500'><FaFacebookF/></li>
            <li className='hover:text-sky-500'><FaTwitter/></li>
            <li className='hover:text-sky-500'><FaInstagram/></li>
        </ul>
        <div>
            <p>Developed by <Link className='hover:text-sky-500' to="https://github.com/thezeeshann" target='_blank'>@thezeeshann</Link></p>
        </div>
    </footer>
  )
}

export default Footer