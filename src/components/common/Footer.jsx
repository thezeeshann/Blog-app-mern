import React from 'react'
import {FaFacebookF,FaTwitter,FaInstagram} from "react-icons/fa"
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='flex flex-row justify-between w-11/12 mx-auto container mb-5 '>
        
        <p className="text-1xl font-bold cursor-pointer uppercase">The Daily Blog</p>

        <ul className='flex flex-row gap-x-3  items-center cursor-pointer'>
            <li className='hover:text-sky-500'><FaFacebookF/></li>
            <li><FaTwitter/></li>
            <li><FaInstagram/></li>
        </ul>
        <div>
            <p>Developed by <Link className='hover:text-sky-500' to="https://github.com/thezeeshann" target='_blank'>@thezeeshann</Link></p>
        </div>
    </footer>
  )
}

export default Footer