import Send from "@/api/send.ts";

export const getProjectView = (projectID: string) => {
  return Send({
    method: "get",
    url: `/conference/view/${projectID}`,
  });
};
