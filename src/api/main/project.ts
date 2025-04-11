import Send from "@/api/send.ts";
import { selectParams } from "@/types/selectParams";

export const getTest = () => {
  return Send({
    method: "get",
    url: "/main/apiTest",
  });
};

export const getProject = (params: selectParams) => {
  return Send({
    method: "get",
    url: "/api/main",
    params: params
  });
};
