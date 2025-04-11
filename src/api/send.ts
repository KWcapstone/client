import axios from 'axios'
// import {getCookie} from "utils/cookie";

if(localStorage.getItem("accessToken")) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("accessToken")}`;
}

const instance = axios.create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*'
  },
  withCredentials: true,
})

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => {
    return response
  },

  (error) => {
    return Promise.reject(error)
  },
)

export default instance
