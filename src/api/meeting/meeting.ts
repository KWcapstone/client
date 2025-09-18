import Send from "@/api/send.ts";
import axios from "axios";

export const getMeetingId = () => {
  return Send({
    method: "post",
    url: "conference",
  });
};

export const postScript = (projectId: string, data: any) => {
  return Send({
    method: "post",
    url: `conference/${projectId}/script`,
    data: data,
  });
};

export const endMeeting = (data: any) => {
  return axios.post(
    `${import.meta.env.VITE_API_SERVER_URL}conference/save`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
};

export const getInviting = (projectId: string, data: any) => {
  return Send({
    method: "post",
    url: `conference/${projectId}/modify_inviting`,
    data: data,
  });
};
