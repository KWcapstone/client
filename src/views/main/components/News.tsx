// style
import "@/views/main/style/news.sass";
import modal_close from "@/assets/imgs/icon/modal_close.svg";
import user_img from "@/assets/imgs/common/user.svg";
import news_img from "@/assets/imgs/common/news.svg";

// import
import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

// interface
interface NewsProps {
  onCloseModal: () => void;
}
interface NewsItem {
  noticeId: {
    timestamp: number;
    date: string;
  };
  userName: string;
  title: string;
  isRead: boolean;
}

const News = ({ onCloseModal }: NewsProps) => {
  type NewsView = "all" | "unread";

  const newsResponse = {
    status: 200,
    message: "모든 알림을 조회합니다.",
    data: [
      {
        noticeId: {
          timestamp: 1742113048,
          date: "2025-03-16T08:17:28.000+00:00",
        },
        userName: "최세연",
        title: "New Feature Update!",
        isRead: true,
      },
      {
        noticeId: {
          timestamp: 1742113048,
          date: "2025-03-16T08:17:28.000+00:00",
        },
        userName: "임서연",
        title: "Welcome to Moaba!",
        isRead: false,
      },
    ],
  };

  const [newsView, setNewsView] = useState<NewsView>("all");

  return (
    <div className="news-container">
      <div onClick={onCloseModal} className="modal-close-btn">
        <img src={modal_close} alt="닫기" />
      </div>
      <div className="news-header">새 소식</div>
      <div className="news-navbar">
        <div className="left">
          <div
            className={`all ${newsView === "all" ? "active" : ""}`}
            onClick={() => setNewsView("all")}
          >
            전체
          </div>
          <div
            className={`unread ${newsView === "unread" ? "active" : ""}`}
            onClick={() => setNewsView("unread")}
          >
            안읽은 소식
          </div>
        </div>
        <div className="right">모두 읽음으로 표시</div>
      </div>
      <div className="news-content">
        {newsResponse.data.map((item) => (
          <NewsItem key={item.noticeId.timestamp} data={item} />
        ))}
      </div>
    </div>
  );
};

export default News;

const timeAgo = ({ timestamp }: { timestamp: string }) => {
  dayjs.extend(relativeTime);
  dayjs.locale("ko");
  const date = dayjs(timestamp);
  const now = dayjs();
  const diffInDays = now.diff(date, "day");

  if (diffInDays >= 1) {
    // 1일 이상이면 그냥 날짜 (예: 2025-03-16)
    return <span>{date.format("YYYY-MM-DD")}</span>;
  }

  // 1일 이내면 "몇 시간 전", "몇 분 전"
  return <span>{date.fromNow()}</span>;
};

const NewsItem = ({ data }: { data: NewsItem }) => {
  return (
    <div className="news-item">
      <img className="news-item-image" src={user_img} alt="User" />
      <div className="news-item-content">
        <div className="news-item-title">{data.title}</div>
        <div className="news-item-date">
          {timeAgo({ timestamp: data.noticeId.date })}
        </div>
      </div>
    </div>
  );
};
