import Send from "@/api/send.ts";
import { selectParams } from "@/types/selectParams";

export const getSummary = (params: selectParams) => {
  return Send({
    method: "get",
    url: "main/summary",
    params: params,
  });
};
