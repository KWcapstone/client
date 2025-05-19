import Send from "@/api/send.ts";

export const openShereModal = (projectId: string) => {
  return Send({
    method: "get",
    url: `/main/project/${projectId}`,
  });
};

export const postEmail = (email: string, projectId: string) => {
  return Send({
    method: "post",
    url: `/main/project/${projectId}/add_by_email`,
    data: {
      email: email,
    },
  });
};

export const getInvite = (projectId: string, code: string) => {
  return Send({
    method: "get",
    url: `/main/project/${projectId}/accept?code=${code}`,
  });
};
