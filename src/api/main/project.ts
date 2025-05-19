import Send from "@/api/send.ts";
import { selectParams } from "@/types/selectParams";
import { projects } from "@/types/deleteProject";

export const getProject = (params: selectParams) => {
  return Send({
    method: "get",
    url: "main",
    params: params,
  });
};

export const deleteProject = (data: projects[]) => {
  return Send({
    method: "delete",
    url: "main/project/delete",
    data: data,
  });
};
