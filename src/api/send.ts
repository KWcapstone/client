import axios from 'axios'
// import {getCookie} from "utils/cookie";

// if(getCookie('login_token')) {
//   axios.defaults.headers.common['Authorization'] = `Bearer ${getCookie('login_token')}`;
// }

const instance = axios.create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
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
