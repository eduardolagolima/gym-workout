import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:3333',
})

api.interceptors.request.use(
  config => {
    const { token } = JSON.parse(localStorage.getItem('user')) || {}

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error.response.data)
  }
)

export default api
