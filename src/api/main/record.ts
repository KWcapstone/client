import Send from "@/api/send.ts";
import { selectParams } from "@/types/selectParams";

export const getRecord = (params: selectParams) => {
  return Send({
    method: "get",
    url: "main/recordings",
    params: params,
  });
};
