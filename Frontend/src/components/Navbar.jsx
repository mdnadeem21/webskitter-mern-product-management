import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <div className='bg-white py-3 shadow-2xl px-4 md:px-0'>
       <div className='max-w-6xl mx-auto flex justify-between items-center'>
                {/* logo section */}
                <div className='flex gap-7 items-center'>
                    <Link to={'/'}><h1 className='font-bold text-3xl'><span className='text-red-500 font-serif'>My</span>cart</h1></Link>
                </div>
                <nav className='flex gap-7 items-center'>
                  <ul className='md:flex gap-7 items-center text-xl font-semibold hidden'>
                    <NavLink to={'/'} className={({ isActive }) => `${isActive ? "border-b-3 transition-all border-red-500" : "text-black"} cursor-pointer`}><li>Home</li></NavLink>
                    <NavLink to={'/add-product'} className={({ isActive }) => `${isActive ? "border-b-3 transition-all border-red-500" : "text-black"} cursor-pointer`}><li>Add Product</li></NavLink>
                  </ul>
                </nav>
        </div>
    </div>
  )
}

export default Navbar