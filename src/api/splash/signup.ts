import Send from "@/api/send.ts";
import { UserData } from "@/types/userData";
import { EmailVerification } from "@/types/emailVerification";

export const postSignUp = (userData: UserData) => {
  return Send({
    method: "post",
    url: "auth/sign_up",
    data: userData,
  });
};

export const postEmailduplication = (email: string) => {
  return Send({
    method: "post",
    url: "auth/email_duplication",
    data: { email },
  });
};

export const postEmailVerification = (emailVerification: EmailVerification) => {
  return Send({
    method: "post",
    url: "auth/email_verification",
    data: emailVerification,
  });
};
