import Send from "@/api/send.ts";

export const getUser = (data: any) => {
  return Send({
    method: "get",
    url: "conference/modify_inviting",
    data: data,
  });
};
