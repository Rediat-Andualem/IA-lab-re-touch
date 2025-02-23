import axios from 'axios'

let axiosInstance = axios.create({
    // baseURL:"http://localhost:4789/api"
    baseURL:"https://ia-lab-backend.onrender.com/api"
})
export {axiosInstance}

