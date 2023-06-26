import axios from 'axios'

export const baseUrl = 'http://localhost:3333'

export const api = axios.create({
  baseURL: baseUrl
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new Error(error.response.data.message))
    } else {
      return Promise.reject(
        new Error('Erro no servidor. Tente novamente mais tarde!')
      )
    }
  }
)
