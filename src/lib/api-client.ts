import Axios from 'axios'

export const api = Axios.create({
  baseURL: 'http://localhost:3001/api',
})

// api.interceptors.response.use((response) => response.data)
