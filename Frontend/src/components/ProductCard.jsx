import React from 'react'
import { useNavigate } from 'react-router-dom'
function ProductCard({product}) {

const navigate = useNavigate()
  return (
    <div className='border relative border-gray-100 rounded-2xl cursor-pointer hover:scale-105 hover:shadow-2xl transition-all p-2 h-max'>
    <img src={product.productImage} alt="" className='bg-gray-100 aspect-square' onClick={()=>navigate(`/products/${product.id}`)}/>
    <h1 className='line-clamp-2 p-1 font-semibold'>{product.name}</h1>
    <p className='my-1 text-lg text-gray-800 font-bold'>${product.price}</p>
    <button onClick={()=>console.log(`Product Added...`)} className='bg-red-500 px-3 py-2 text-lg w-full  rounded-md text-white cursor-pointer flex gap-2 items-center justify-center font-semibold'> Add to Cart</button>
  </div>
  )
}

export default ProductCard