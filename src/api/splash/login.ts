import Send from "@/api/send.ts";
import { LoginData } from "@/types/loginData";

export const postLogin = (loginData: LoginData) => {
  return Send({
    method: "post",
    url: "/api/auth/login",
    data: loginData,
  });
};
