import Send from "@/api/send.ts";

export const openShereModal = (projectId: string[]) => {
  return Send({
    method: "get",
    url: `/main/project/${projectId}`,
  });
};
