// src/api/send.ts
import axios from "axios";
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from "@/utils/auth";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 - accessToken 추가
instance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터 - 토큰 만료 시 갱신 처리
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // accessToken 만료 (예: 401)
    if (error.response?.status === 401 && error.response?.data.message === 'AUTH_002' && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(`${import.meta.env.VITE_API_SERVER_URL}auth/refresh`, {
          refreshToken: getRefreshToken(),
        });
        const { accessToken, refreshToken } = res.data.data;
        setTokens(accessToken, refreshToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return instance(originalRequest);
      } catch (e) {
        alert('로그인이 만료되었습니다.')
        clearTokens();
        window.location.href = "/";
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
