import axios from 'axios'

export const fetchUrl = (url: string) => {
  return axios.get(url)
}
