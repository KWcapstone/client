import axios from "axios";
// import {getCookie} from "utils/cookie";

if (localStorage.getItem("accessToken")) {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("accessToken")}`;
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;

// instance.interceptors.request.use(
//   (config) => {
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   },
// )

// instance.interceptors.response.use(
//   (response) => {
//     return response
//   },

//   (error) => {
//     return Promise.reject(error)
//   },
// )
