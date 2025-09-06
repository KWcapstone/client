import Send from "@/api/send.ts";

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

export const postAgree = () => {
  return Send({
    method: "post",
    url: `/auth/agree`,
  });
};
