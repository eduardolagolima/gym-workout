import axios from 'axios'

const apiUrl = process.env.VUE_APP_API_URL || 'http://localhost:3333'

async function request(method, url, data) {
  const { token } = JSON.parse(localStorage.getItem('user')) || {}

  try {
    const response = await axios({
      method,
      url: apiUrl + url,
      headers: {
        'Content-Type': 'application/json',
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
      data,
    })

    return response.data
  } catch (error) {
    throw error.response.data
  }
}

export default request
