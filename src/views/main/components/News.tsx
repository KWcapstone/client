// style
import "@/views/main/style/news.sass";
import modal_close from "@/assets/imgs/icon/modal_close.svg";
import user_img from "@/assets/imgs/common/user.svg";
import news_img from "@/assets/imgs/common/news.svg";
import unread_dot from "@/assets/imgs/icon/unread_dot.svg";

// import
import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

// type
import { newsProps, newsItemData } from "@/types/news";

// api
//import { getNews } from "@/api/main/news.ts";

const News = ({
  onCloseModal,
  newsAllResponse,
  newsUnreadResponse,
  errMessage,
  onClick,
}: newsProps) => {
  type NewsView = "all" | "unread";
  const [newsView, setNewsView] = useState<NewsView>("all");
  //const [newsAllResponse, setNewsAllResponse] = useState<newsItemData[]>(allNews);
  //const [newsUnreadResponse, setNewsUnreadResponse] = useState<newsItemData[]>(unreadNews);

  // useEffect(() => {
  //   const res = getNews("all");

  //   res.then((response) => {
  //     setNewsAllResponse(response.data.data);
  //   });
  //   const res2 = getNews("unread");
  //   res2.then((response) => {
  //     setNewsUnreadResponse(response.data.data);
  //   });

  //   console.log("All News:", newsAllResponse);
  //   console.log("Unread News:", newsUnreadResponse);

  //   newsUnreadResponse
  //     ? setErrMessage("")
  //     : setErrMessage("모든 소식을 읽었습니다.");

  //   newsAllResponse ? "" : setErrMessage("소식이 없습니다.");
  // }, [newsView]);

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
            className={`unread ${newsView === "unread" ? "active" : ""} ${
              newsUnreadResponse ? "unread-relative" : ""
            }`}
            onClick={() => setNewsView("unread")}
          >
            안읽은 소식
            {newsUnreadResponse ? (
              <img className="unread-dot" src={unread_dot} alt="안읽은 소식" />
            ) : null}
          </div>
        </div>
        <div className="right" onClick={onClick}>
          모두 읽음으로 표시
        </div>
      </div>
      {newsView === "all" ? (
        <div className="news-content">
          {newsAllResponse ? (
            newsAllResponse.map((item) => (
              <NewsItem
                key={item.noticeId.timestamp}
                data={item}
                isUnread={item.isRead ? false : true}
              />
            ))
          ) : (
            <div className="no-news">{errMessage}</div>
          )}
        </div>
      ) : (
        <div className="news-content">
          {newsUnreadResponse ? (
            newsUnreadResponse.map((item) => (
              <NewsItem
                key={item.noticeId.timestamp}
                data={item}
                isUnread={true}
              />
            ))
          ) : (
            <div className="no-news"> {errMessage}</div>
          )}
        </div>
      )}
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

const NewsItem = ({
  data,
  isUnread,
}: {
  data: newsItemData;
  isUnread: boolean;
}) => {
  return (
    <div className="news-item">
      <div className={`news-item-image ${isUnread ? "news-item-unread" : ""}`}>
        <img
          className="item-img"
          src={data.official ? news_img : user_img}
          alt="User"
        />
        {isUnread && (
          <img
            className="news-item-unread-dot"
            src={unread_dot}
            alt="안읽은 소식"
          />
        )}
      </div>
      <div className="news-item-content">
        <div className="news-item-title">
          {data.url ? (
            <>
              {data.title}
              <a className="news-item-url" href={data.url}>
                read more
              </a>
            </>
          ) : (
            data.title
          )}
        </div>
        <div className="news-item-date">
          {timeAgo({ timestamp: data.noticeId.date })}
        </div>
      </div>
    </div>
  );
};
