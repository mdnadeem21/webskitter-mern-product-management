import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";
import { getData } from "../context/DataContext";
import ProductCard from "../components/ProductCard";
import FilterSection from "../components/FilterSection";

function Home() {
  const { data, fetchAllProducts } = getData();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);


  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);
  useEffect(() => {
    if (!data) return;
    const updatedList = data.filter((product) => {
      const matchesSearch =
        !search ||
        product.name?.toLowerCase().includes(search.toLowerCase()) ||
        product.brand?.toLowerCase().includes(search.toLowerCase());
  
      const matchesCategory =
        category === "All" || product.category === category;
  
      const matchesBrand = brand === "All" || product.brand === brand;
  
      const productPrice = Number(product.price) || 0;
      const matchesPrice =
        productPrice >= priceRange[0] && productPrice <= priceRange[1];
  
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });
  
    setFilteredProducts(updatedList);
  }, [search, category, brand, priceRange, data]);


  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 font-medium">
        No products available.
      </div>
    );
  }

  return (
    // <div className="max-w-6xl mx-auto px-4 my-10">
    //   <div className="flex gap-8">
    //     <FilterSection setSearch={setSearch} brand={brand} setBrand={setBrand} priceRange={priceRange} setPriceRange={setPriceRange} category={category} setCategory={setCategory} handleCategoryChange={handleCategoryChange}  handleBrandChange={handleBrandChange}/>
    //     <div className="flex flex-col justify-center items-center">
    //       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-7">
    //         {filteredProducts.map((product, index) => (
    //           <ProductCard key={product.id || index} product={product} />
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 my-6 md:my-10">
      
      {/* 1. Mobile Header & Filter Toggle Button (Visible only on mobile/tablet) */}
      <div className="flex items-center justify-between lg:hidden mb-6 bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Products</h1>
          <p className="text-xs text-gray-500">{filteredProducts.length} items found</p>
        </div>
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-colors shadow-xs"
        >
          {/* Simple Inline Filter Icon */}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
        </button>
      </div>

      <div className="flex gap-8 items-start">
        
        {/* 2. Desktop Left Sidebar Panel (Hidden on mobile, Sticky on Desktop) */}
        <aside className="hidden lg:block w-64 xl:w-72 lg:sticky lg:top-6 flex-shrink-0 bg-white border border-gray-100 rounded-2xl p-5 shadow-xs">
          <h2 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Filters</h2>
          <FilterSection 
            setSearch={setSearch} 
            brand={brand} 
            setBrand={setBrand} 
            priceRange={priceRange} 
            setPriceRange={setPriceRange} 
            category={category} 
            setCategory={setCategory} 
            handleCategoryChange={handleCategoryChange}  
            handleBrandChange={handleBrandChange}
          />
        </aside>

        {/* 3. Mobile Filter Drawer / Slide-out Modal */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
            {/* Backdrop Blur Overlay */}
            <div 
              className="fixed inset-0 bg-gray-900/40 backdrop-blur-xs transition-opacity" 
              onClick={() => setIsMobileFilterOpen(false)}
            />
            
            {/* Slide-out Panel Content */}
            <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white p-6 shadow-xl flex flex-col justify-between overflow-y-auto animate-slide-in">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                  <button 
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <FilterSection 
                  setSearch={setSearch} 
                  brand={brand} 
                  setBrand={setBrand} 
                  priceRange={priceRange} 
                  setPriceRange={setPriceRange} 
                  category={category} 
                  setCategory={setCategory} 
                  handleCategoryChange={handleCategoryChange}  
                  handleBrandChange={handleBrandChange}
                />
              </div>

              {/* View Results Sticky Action Mobile Button */}
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors shadow-xs text-center text-sm"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* 4. Right Main Panel - Responsive 4-Column Product Grid */}
        <main className="flex-1 w-full">
          {/* Desktop Header Description (Hidden on mobile) */}
          <div className="hidden lg:flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-gray-900">All Products</h1>
            <p className="text-sm text-gray-500">Showing {filteredProducts.length} items</p>
          </div>

          {/* Grid Layout Engine */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard 
                key={product.id || product._id || index} 
                product={product} 
              />
            ))}
          </div>

          {/* Fallback Screen for Empty Filtering Datasets */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200 mt-2">
              <p className="text-gray-500 font-semibold text-sm">No products found matching your current selection.</p>
              <button 
                onClick={() => { setBrand(''); setCategory(''); setPriceRange([0, 1000]); }} 
                className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-bold underline cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}

export default Home;
