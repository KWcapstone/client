import Send from "@/api/send.ts";

export const getMeetingId = () => {
  return Send({
    method: "post",
    url: "conference"
  });
};

export const postScript = (projectId: string, data: any) => {
  return Send({
    method: "post",
    url: `conference/${projectId}/script`,
    data: data
  });
};

export const endMeeting = (data: any) => {
  return Send({
    method: "post",
    url: "conference/save",
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
