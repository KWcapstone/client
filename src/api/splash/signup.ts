import Send from "@/api/send.ts";
import { UserData } from "@/types/userData";
import { EmailVerification } from "@/types/emailVerification";

export const postSignUp = (userData: UserData) => {
  return Send({
    method: "post",
    url: "auth/sign_up",
    data: userData,
    withCredentials: true,
  });
};

export const postEmailduplication = (email: string) => {
  return Send({
    method: "post",
    url: "auth/email_duplication",
    data: { email },
    withCredentials: true,
  });
};

export const postEmailVerification = (emailVerification: EmailVerification) => {
  return Send({
    method: "post",
    url: "auth/email_verification",
    data: emailVerification,
    withCredentials: true,
  });
};
