import Send from "@/api/send.ts";

export const getFileDwn = (projectId: string, kind: string) => {
  return Send({
    method: "get",
    url: `main/project/${projectId}/export?kind=${kind}`,
  });
};
