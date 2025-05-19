import Send from "@/api/send.ts";
import { searchParams } from "@/types/searchParams";

export const getTest = () => {
  return Send({
    method: "get",
    url: "main/apiTest",
  });
};

export const getSearch = (params: searchParams) => {
  return Send({
    method: "get",
    url: "main/search",
    params: params,
  });
};

export const patchProjectName = (projectId: string, name: string) => {
  return Send({
    method: "patch",
    url: `/main/project/${projectId}/edit`,
    data: name,
  });
};
