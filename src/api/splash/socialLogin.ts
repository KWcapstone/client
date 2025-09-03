import Send from "@/api/send.ts";

export const postKakaoLogin = (code: string) => {
  return Send({
    method: "get",
    url: "/auth/login/kakao",
    data: { code },
  });
};
