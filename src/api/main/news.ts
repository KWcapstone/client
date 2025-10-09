import Send from "@/api/send.ts";

export const getNews = (type: "all" | "unread") => {
  return Send({
    method: "get",
    url: `/main/notice?type=${type}`,
  });
};
