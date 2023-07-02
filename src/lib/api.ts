import axios from 'axios'

export const baseUrl = 'http://172.22.57.192:5555'

export const api = axios.create({
  baseURL: baseUrl
})
