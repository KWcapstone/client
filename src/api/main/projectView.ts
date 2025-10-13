import Send from "@/api/send.ts";

export const getStatus = (projectID: string) => {
  return Send({
    method: "get",
    url: `/main/project/${projectID}/status`,
  });
};


export const getProjectView = (projectID: string) => {
  return Send({
    method: "get",
    url: `/conference/view/${projectID}`,
  });
};
