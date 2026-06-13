import axios from 'axios'
import { createContext, useState, useContext } from "react";

export const DataContext = createContext(null)

export const DataProvider = ({ children }) => {
    const [data, setData] = useState()
    // fetch data
    const fetchAllProducts = async () =>{
        try {
            const res = await axios.get('http://localhost:6060/api/v1/products/get-product')
            
            const productData = res.data.data;
            setData(productData)
        } catch (error) {
            console.log(`Error in fetching data : ${error}`)
        }
    }

    const getUniqueCategory = (data, property) =>{
        let newVal = data?.map((curElem) =>{
            return curElem[property]
        })
        newVal = ["All",...new Set(newVal)]
        return newVal
      }
    
      const categoryOnlyData = getUniqueCategory(data, "category")
      const brandOnlyData = getUniqueCategory(data, "brand")
    return <DataContext.Provider value={{data, setData, fetchAllProducts, categoryOnlyData, brandOnlyData}}>
        {children}
    </DataContext.Provider>
}

export const getData = ()=> useContext(DataContext)