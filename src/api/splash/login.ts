import Send from "@/api/send.ts";
import { LoginData } from "@/types/loginData";

export const postLogin = (loginData: LoginData) => {
  return Send({
    method: "post",
    url: "auth/login",
    data: loginData,
    withCredentials: true,
  });
};

export const refresh = (data:any) => {
  return Send({
    method: "post",
    url: "auth/refresh",
    data: data,
    withCredentials: true,
  });
};

export const logout = () => {
  return Send({
    method: "delete",
    url: "auth/logout"
  });
};
