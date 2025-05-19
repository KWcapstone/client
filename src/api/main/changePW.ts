import Send from "@/api/send.ts";

export const PostCheckPW = (password: string) => {
  return Send({
    method: "post",
    url: "auth/check_pw",
    data: password,
  });
};

export const PostChangePW = (
  originalPassword: string,
  changePassword: string
) => {
  return Send({
    method: "patch",
    url: "auth/change_pw",
    data: {
      originalPassword: originalPassword,
      changePassword: changePassword,
    },
  });
};
