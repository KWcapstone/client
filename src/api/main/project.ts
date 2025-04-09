import Send from "@/api/send.ts";

export const getTest = () => {
  return Send({
    method: "get",
    url: "/api/main/apiTest",
  });
};
