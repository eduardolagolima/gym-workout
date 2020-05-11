import axios from 'axios'

const baseUrl = 'http://192.168.0.122:3333'

async function request(method, url, data) {
  const { token } = JSON.parse(localStorage.getItem('user')) || {}

  try {
    const response = await axios({
      method,
      url: baseUrl + url,
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
