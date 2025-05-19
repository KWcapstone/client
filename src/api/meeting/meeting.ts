import Send from "@/api/send.ts";

export const getMeetingId = () => {
  return Send({
    method: "post",
    url: "conference"
  });
};

export const postScript = (data: any) => {
  return Send({
    method: "post",
    url: "conference/script",
    data: data
  });
};

export const getInviting = (projectId: string, data: any) => {
  return Send({
    method: "post",
    url: `conference/${projectId}/modify_inviting`,
    data: data,
  });
};
