// style
import "@/views/main/style/project.sass";

// component
import SideBar from "@/views/main/components/SideBar";
import useSpeechToText from "@/views/main/components/useSpeechToText";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProjectPage = () => {
  const [sort, setSort] = useState<string>("all");
  const { transcript, listening, toggleListening } = useSpeechToText();

  // ✅ transcript 값이 변경될 때 로그 확인
  useEffect(() => {
    console.log("현재 인식된 텍스트:", transcript);
  }, [transcript]);

  return (
    <div className="main">
      <SideBar />
      <div className="project-wrap">
        <div className="nevigation-wrap">
          <div className="title-wrap">
            <h2>전체 회의</h2>
            <div className="search-wrap">
              <input type="text" placeholder="회의명 검색" />
              <Link to="/meeting">+새로 만들기</Link>
            </div>
          </div>
          <div className="sort-wrap">
            <div className="tab-wrap">
              <ul>
                <li className={sort === "all" ? "active" : ""}>
                  <button type="button" onClick={() => setSort("all")}>
                    전체
                  </button>
                </li>
                <li className={sort === "mine" ? "active" : ""}>
                  <button type="button" onClick={() => setSort("mine")}>
                    내 회의
                  </button>
                </li>
                <li className={sort === "invite" ? "active" : ""}>
                  <button type="button" onClick={() => setSort("invite")}>
                    초대된 회의
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ✅ transcript가 화면에 정상적으로 표시됨 */}
        <textarea className="transcript" value={transcript} readOnly />

        <button onClick={toggleListening}>
          {listening ? "음성인식 중지" : "음성인식 시작"}
        </button>
      </div>
    </div>
  );
};

export default ProjectPage;
