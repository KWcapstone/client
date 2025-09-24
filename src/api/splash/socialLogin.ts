import Send from "@/api/send.ts";
import axios from "axios";

export const postKakaoLogin = (code: string) => {
  return Send({
    method: "get",
    url: `/auth/login/kakao?code=${code}`,
  });
};

export const postNaverLogin = (code: string) => {
  return Send({
    method: "get",
    url: `/auth/login/naver?code=${code}`,
  });
};

export const postGoogleLogin = (code: string) => {
  return Send({
    method: "get",
    url: `/auth/login/google?code=${code}`,
  });
};

export const postAgree = (memberId: string) => {
  // return Send({
  //   method: "post",
  //   url: `/auth/agree`,
  // });
  return axios.post(`${import.meta.env.VITE_API_SERVER_URL}auth/agree`, {
    memberId,
  });
};
