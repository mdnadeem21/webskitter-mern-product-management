import axios from 'axios'

export const baseUrl = `http://localhost:6060/api/v1/products`
export const AxiosInstance= axios.create ({
    baseURL:baseUrl
    
})

export default AxiosInstance;