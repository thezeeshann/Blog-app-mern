import React from 'react'
import {FaFacebookF,FaTwitter,FaInstagram} from "react-icons/fa"
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='flex flex-row justify-between lg:w-11/12 md:w-11/12 sm:w-11/12 xs:w-11/12 small-xs:w-11/12 mx-auto container mb-5'>
        
        <p className="lg:text-1xl md:text-lg sm:text-base xs:text-sm small-xs:text-xs font-bold cursor-pointer uppercase">The Daily Blog</p>

        <ul className='small-xs:hidden  lg:flex md:flex sm:flex xs:flex flex-row gap-x-3  items-center cursor-pointer'>
            <li className='hover:text-sky-500'><FaFacebookF/></li>
            <li className='hover:text-sky-500'><FaTwitter/></li>
            <li className='hover:text-sky-500'><FaInstagram/></li>
        </ul>
        <div className='small-xs:text-xs'>
            <p>Developed by <Link className='hover:text-sky-500' to="https://github.com/thezeeshann" target='_blank'>@thezeeshann</Link></p>
        </div>
    </footer>
  )
}

export default Footer