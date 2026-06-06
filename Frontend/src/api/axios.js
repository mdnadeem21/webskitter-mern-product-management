import axios from 'axios'

export const baseUrl = `http://localhost:6060/api/v1/products`
export const AxiosInstance= axios.create ({
    baseUrl
    
})

export default AxiosInstance;