import Send from "@/api/send.ts";

export const getProfile = () => {
  return Send({
    method: "get",
    url: "main/profile",
  });
};
