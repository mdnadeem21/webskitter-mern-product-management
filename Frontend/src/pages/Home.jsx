import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../context/DataContext'
import { getData } from '../context/DataContext'
import ProductCard from '../components/ProductCard'
import FilterSection from '../components/FilterSection'

function Home() {
  // const {fetchAllProducts} = useContext(DataContext)
  const {data,fetchAllProducts} = getData()

  useEffect(() => {
    fetchAllProducts()
    window.scrollTo(0,0)
  }, [])


  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 font-medium">
        No products available.
      </div>
    );
  }

  
  return (
    <div className="max-w-6xl mx-auto px-4 my-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-7">
        {data.map((product, index) => (
          <ProductCard key={product.id || index} product={product} />
        ))}
      </div>
    </div>
  );
  // return (
  //   <div>
  //     <div className='max-w-6xl mx-auto px-4 mb-10'>
  //       {
  //         data?.length > 0 ? (
  //           <>
  //           <div className='flex gap-8'>
  //               <FilterSection search={search} setSearch={setSearch} brand={brand} setBrand={setBrand} priceRange={priceRange} setPriceRange={setPriceRange} category={category} setCategory={setCategory} handleCategoryChange={handleCategoryChange} handleBrandChange={handleBrandChange}  />
  //               {
  //                 filteredData?.length > 0 ? (
  //                   <div className='flex flex-col justify-center items-center'>
  //                     <div className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-7 mt-10'>
  //                       {
  //                         filteredData?.slice(page * 8 - 8, page * 8).map((product, index) => {
  //                           return <ProductCard key={index} product={product} />
  //                         })
  //                       }
  //                     </div>
  //                     {/* <Pagination pageHandler={pageHandler} page={page} dynamicPage={dynamicPage} /> */}
  //                   </div>
  //                 ) : (
  //                   // <div className='flex justify-center items-center md:h-[600px] md:w-[900px] mt-10'>
  //                   //        <Lottie animationData={notfound} classID='w-[500px]'/>
  //                   // </div>
  //                     <div>No Data in filter</div>
  //                 )
  //               }

  //             </div>
  //           </>
  //         ) :(
  //           <div>No data</div>
  //         )
  //       }
  //     </div>
  //   </div>
  // )
}

export default Home