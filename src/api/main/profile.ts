import Send from "@/api/send.ts";
import { profileData } from "@/types/profileData";

export const getProfile = () => {
  return Send({
    method: "get",
    url: "main/profile",
  });
};

export const Withdraw = () => {
  return Send({
    method: "delete",
    url: "auth/withdraw",
  });
};

export const patchProfile = (data: profileData) => {
  return Send({
    method: "patch",
    url: "main/profile",
    data: data,
  });
};
