import Send from "@/api/send.ts";
import { selectParams } from "@/types/selectParams";

export const getProject = (params: selectParams) => {
  return Send({
    method: "get",
    url: "main",
    params: params,
  });
};
