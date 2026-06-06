import axios from 'axios'
import { createContext, useState, useContext } from "react";

export const DataContext = createContext(null)

export const DataProvider = ({ children }) => {
    const [data, setData] = useState()
    // fetch data
    const fetchAllProducts = async () =>{
        try {
            const res = await axios.get('http://localhost:6060/api/v1/products/get-product')
            console.log(res)
            const productData = res.data.data;
            setData(productData)
            console.log(productData)
        } catch (error) {
            console.log(`Error in fetching data : ${error}`)
        }
    }
    return <DataContext.Provider value={{data, setData, fetchAllProducts}}>
        {children}
    </DataContext.Provider>
}

export const getData = ()=> useContext(DataContext)