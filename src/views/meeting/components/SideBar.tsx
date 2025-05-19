// style
import "@/views/meeting/style/side-bar.sass";

// component
import sidePanel from "@/assets/imgs/icon/side_panel.svg";

// assets
import test from "@/assets/imgs/common/user.svg";

// import
import { useEffect, useState } from "react";

// type
import { conferenceData } from "@/types/conferanceData";
import { RealTimeSummaryData } from "@/types/realTimeSummaryData";

// api
import { getProfile } from "@/api/main/profile";

interface scriptData {
  time: string;
  script: string;
}
interface SideBarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  scripts?: scriptData[];
  conferenceData: conferenceData;
  summarys?: RealTimeSummaryData[];
}

const SideBar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  scripts,
  conferenceData,
  summarys,
}: SideBarProps) => {
  const [isScript, setIsScript] = useState(false);
  const [isSummary, setIsSummary] = useState(true);
  const [usrName, setUsrName] = useState<string>("");

  // console.log("스크립트", scripts);
  function formatDateString(input: string): string {
    const date = new Date(input);

    // 년, 월, 일
    const year = String(date.getFullYear()).slice(2); // '25'
    const month = date.getMonth() + 1; // 0-based
    const day = date.getDate();

    // 요일
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const dayOfWeek = weekdays[date.getDay()];

    // 시간
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const isPM = hours >= 12;
    const period = isPM ? "오후" : "오전";
    hours = hours % 12 || 12; // 0시는 12로 표시

    return `${year}.${month}.${day} ${dayOfWeek} ${period} ${hours}:${minutes}`;
  }

  useEffect(() => {
    getProfile().then((res: any) => {
      setUsrName(res.data.data.name);
    });
  }, []);

  console.log("프로젝트 아이디", conferenceData.projectId);

  return (
    <div
      className={`side-bar ${isSidebarOpen ? "open" : "closed"}`}
      style={{ width: isSidebarOpen ? 340 : 56 }}
    >
      {isSidebarOpen ? (
        <>
          {/* 기존 내용들 */}
          <div className="side-bar-wrap">
            <img
              src={sidePanel}
              alt="side-panel"
              className="cursor-pointer"
              onClick={() => setIsSidebarOpen(false)}
            />
            <div className="side-bar-title-wrap">
              <div className="side-bar-title">{conferenceData.projectName}</div>
              <div className="side-bar-details">
                <div className="detail date">
                  <span className="detail-title">회의일자</span>
                  <span className="detail-des">
                    {formatDateString(conferenceData.updatedAt)}
                  </span>
                </div>
                <div className="detail creator">
                  <span className="detail-title">생성자</span>
                  <div className="creator-wrap">
                    <img src={test} alt="creator" className="creator-icon" />
                    <span className="detail-des">{usrName}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-wrap">
            <div className="content-titles">
              <div
                className={`content-title cursor-pointer ${
                  isSummary ? "active" : ""
                }`}
                onClick={() => {
                  setIsScript(false);
                  setIsSummary(true);
                }}
              >
                실시간 요약
              </div>
              <div
                className={`content-title cursor-pointer ${
                  isScript ? "active" : ""
                }`}
                onClick={() => {
                  setIsScript(true);
                  setIsSummary(false);
                }}
              >
                스크립트
              </div>
            </div>
            <div className="content-des">
              {isScript ? (
                <div className="des-script-wrap">
                  {scripts && scripts.length > 0 ? (
                    scripts.map((item, index) => (
                      <div className="des-wrap" key={index}>
                        <div className="des-timestamp">{item.time}</div>
                        <div className="des-item">{item.script}</div>
                      </div>
                    ))
                  ) : (
                    <div className="no-script">스크립트가 없습니다.</div>
                  )}
                </div>
              ) : (
                <>
                  <div className="des-wrap">
                    {summarys && summarys.length > 0 ? (
                      summarys.map((item, index) => (
                        <div className="des-wrap" key={index}>
                          <div className="des-timestamp">{item.time}</div>
                          <div className="des-title">{item.title}</div>
                          <ul className="des-list">
                            {item.item.split("\n").map((listItem, idx) => (
                              <li className="des-item" key={idx}>
                                {listItem}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))
                    ) : (
                      <div className="no-script">스크립트가 없습니다.</div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <img
          src={sidePanel}
          alt="side-panel"
          className="cursor-pointer"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      )}
    </div>
  );
};

export default SideBar;
