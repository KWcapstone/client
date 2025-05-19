import Send from "@/api/send.ts";
import { ResetPWData } from "@/types/loginData";

export const postResetPW = (data: ResetPWData) => {
  return Send({
    method: "post",
    url: "auth/reset_pw",
    data: data,
  });
};
