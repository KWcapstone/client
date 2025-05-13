import "@/views/meeting/style/side-bar.sass";
import sidePanel from "@/assets/imgs/icon/side_panel.svg";
import test from "@/assets/imgs/common/user.svg";
import { useState } from "react";

interface SideBarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar = ({ isSidebarOpen, setIsSidebarOpen }: SideBarProps) => {
  const [isScript, setIsScript] = useState(false);
  const [isSummary, setIsSummary] = useState(true);

  return isSidebarOpen ? (
    <div className="side-bar">
      <div className="side-bar-wrap">
        <img
          src={sidePanel}
          alt="side-panel"
          className="side-panel-icon"
          onClick={() => setIsSidebarOpen(false)}
        />
        <div className="side-bar-title-wrap">
          <div className="side-bar-title">새 회의</div>
          <div className="side-bar-details">
            <div className="detail date">
              <span className="detail-title">회의일자</span>
              <span className="detail-des">25.2.24 월 오후 11:47</span>
            </div>
            <div className="detail creator">
              <span className="detail-title">생성자</span>
              <div className="creator-wrap">
                <img src={test} alt="creator" className="creator-icon" />
                <span className="detail-des">모아바</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-wrap">
        <div className="content-titles">
          <div
            className={`content-title ${isSummary ? "active" : ""}`}
            onClick={() => {
              setIsScript(false);
              setIsSummary(true);
            }}
          >
            실시간 요약
          </div>
          <div
            className={`content-title ${isScript ? "active" : ""}`}
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
            <div>
              <div className="des-wrap">
                <div className="des-timestamp">21:03</div>
                <div className="des-item">
                  이번 주 영업 전략 회의를 시작하겠습니다. 먼저, 지난주 영업
                  실적을 공유하고 이번 주 목표를 설정해보죠.
                </div>
              </div>
              <div className="des-wrap">
                <div className="des-timestamp">21:03</div>
                <div className="des-item">
                  이번 주 영업 전략 회의를 시작하겠습니다. 먼저, 지난주 영업
                  실적을 공유하고 이번 주 목표를 설정해보죠.
                </div>
              </div>
              <div className="des-wrap">
                <div className="des-timestamp">21:03</div>
                <div className="des-item">
                  이번 주 영업 전략 회의를 시작하겠습니다. 먼저, 지난주 영업
                  실적을 공유하고 이번 주 목표를 설정해보죠.
                </div>
              </div>
              <div className="des-wrap">
                <div className="des-timestamp">21:03</div>
                <div className="des-item">
                  이번 주 영업 전략 회의를 시작하겠습니다. 먼저, 지난주 영업
                  실적을 공유하고 이번 주 목표를 설정해보죠.
                </div>
              </div>
              <div className="des-wrap">
                <div className="des-timestamp">21:03</div>
                <div className="des-item">
                  이번 주 영업 전략 회의를 시작하겠습니다. 먼저, 지난주 영업
                  실적을 공유하고 이번 주 목표를 설정해보죠.
                </div>
              </div>
              <div className="des-wrap">
                <div className="des-timestamp">21:03</div>
                <div className="des-item">
                  이번 주 영업 전략 회의를 시작하겠습니다. 먼저, 지난주 영업
                  실적을 공유하고 이번 주 목표를 설정해보죠.
                </div>
              </div>
              <div className="des-wrap">
                <div className="des-timestamp">21:03</div>
                <div className="des-item">
                  이번 주 영업 전략 회의를 시작하겠습니다. 먼저, 지난주 영업
                  실적을 공유하고 이번 주 목표를 설정해보죠.
                </div>
              </div>
              <div className="des-wrap">
                <div className="des-timestamp">21:03</div>
                <div className="des-item">
                  이번 주 영업 전략 회의를 시작하겠습니다. 먼저, 지난주 영업
                  실적을 공유하고 이번 주 목표를 설정해보죠.
                </div>
              </div>
              <div className="des-wrap">
                <div className="des-timestamp">21:03</div>
                <div className="des-item">
                  이번 주 영업 전략 회의를 시작하겠습니다. 먼저, 지난주 영업
                  실적을 공유하고 이번 주 목표를 설정해보죠.
                </div>
              </div>
              <div className="des-wrap">
                <div className="des-timestamp">21:03</div>
                <div className="des-item">
                  이번 주 영업 전략 회의를 시작하겠습니다. 먼저, 지난주 영업
                  실적을 공유하고 이번 주 목표를 설정해보죠.
                </div>
              </div>
              <div className="des-wrap">
                <div className="des-timestamp">21:03</div>
                <div className="des-item">
                  이번 주 영업 전략 회의를 시작하겠습니다. 먼저, 지난주 영업
                  실적을 공유하고 이번 주 목표를 설정해보죠.
                </div>
              </div>
              <div className="des-wrap">
                <div className="des-timestamp">21:03</div>
                <div className="des-item">
                  이번 주 영업 전략 회의를 시작하겠습니다. 먼저, 지난주 영업
                  실적을 공유하고 이번 주 목표를 설정해보죠.
                </div>
              </div>
              <div className="des-wrap">
                <div className="des-timestamp">21:03</div>
                <div className="des-item">
                  이번 주 영업 전략 회의를 시작하겠습니다. 먼저, 지난주 영업
                  실적을 공유하고 이번 주 목표를 설정해보죠.
                </div>
              </div>
              <div className="des-wrap">
                <div className="des-timestamp">21:03</div>
                <div className="des-item">
                  이번 주 영업 전략 회의를 시작하겠습니다. 먼저, 지난주 영업
                  실적을 공유하고 이번 주 목표를 설정해보죠.
                </div>
              </div>
              <div className="des-wrap">
                <div className="des-timestamp">21:03</div>
                <div className="des-item">
                  이번 주 영업 전략 회의를 시작하겠습니다. 먼저, 지난주 영업
                  실적을 공유하고 이번 주 목표를 설정해보죠.
                </div>
              </div>
              <div className="des-wrap">
                <div className="des-timestamp">21:03</div>
                <div className="des-item">
                  이번 주 영업 전략 회의를 시작하겠습니다. 먼저, 지난주 영업
                  실적을 공유하고 이번 주 목표를 설정해보죠.
                </div>
              </div>
              <div className="des-wrap">
                <div className="des-timestamp">21:03</div>
                <div className="des-item">
                  이번 주 영업 전략 회의를 시작하겠습니다. 먼저, 지난주 영업
                  실적을 공유하고 이번 주 목표를 설정해보죠.
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="des-wrap">
                <div className="des-timestamp">21:03</div>
                <div className="des-title">기획자의 문서 작성법</div>
                <ul className="des-list">
                  <li className="des-item">
                    중간중간 회고를 하거나 아니면 어떤 제품에서 어떤 기능을 조금
                    스펙 아웃하고 다른 기능을 좀 더 신경 써야 되지 않을까라는
                    것들을 볼 수 있게끔 하는 걸 추천함 사람이 하는 일이다 보니까
                    어쩔 수 없이 변동
                  </li>
                  <li className="des-item">
                    중간중간 회고를 하거나 아니면 어떤 제품에서 어떤 기능을 조금
                    스펙 아웃하고 다른 기능을 좀 더 신경 써야 되지 않을까라는
                    것들을 볼 수 있게끔 하는 걸 추천함 사람이 하는 일이다 보니까
                    어쩔 수 없이 변동
                  </li>
                  <li className="des-item">
                    중간중간 회고를 하거나 아니면 어떤 제품에서 어떤 기능을 조금
                    스펙 아웃하고 다른 기능을 좀 더 신경 써야 되지 않을까라는
                    것들을 볼 수 있게끔 하는 걸 추천함 사람이 하는 일이다 보니까
                    어쩔 수 없이 변동
                  </li>
                  <li className="des-item">
                    중간중간 회고를 하거나 아니면 어떤 제품에서 어떤 기능을 조금
                    스펙 아웃하고 다른 기능을 좀 더 신경 써야 되지 않을까라는
                    것들을 볼 수 있게끔 하는 걸 추천함 사람이 하는 일이다 보니까
                    어쩔 수 없이 변동
                  </li>
                  <li className="des-item">
                    중간중간 회고를 하거나 아니면 어떤 제품에서 어떤 기능을 조금
                    스펙 아웃하고 다른 기능을 좀 더 신경 써야 되지 않을까라는
                    것들을 볼 수 있게끔 하는 걸 추천함 사람이 하는 일이다 보니까
                    어쩔 수 없이 변동
                  </li>
                </ul>
              </div>
              <div className="des-wrap">
                <div className="des-timestamp">21:03</div>
                <div className="des-title">기획자의 문서 작성법</div>
                <ul className="des-list">
                  <li className="des-item">
                    중간중간 회고를 하거나 아니면 어떤 제품에서 어떤 기능을 조금
                    스펙 아웃하고 다른 기능을 좀 더 신경 써야 되지 않을까라는
                    것들을 볼 수 있게끔 하는 걸 추천함 사람이 하는 일이다 보니까
                    어쩔 수 없이 변동
                  </li>
                  <li className="des-item">
                    중간중간 회고를 하거나 아니면 어떤 제품에서 어떤 기능을 조금
                    스펙 아웃하고 다른 기능을 좀 더 신경 써야 되지 않을까라는
                    것들을 볼 수 있게끔 하는 걸 추천함 사람이 하는 일이다 보니까
                    어쩔 수 없이 변동
                  </li>
                  <li className="des-item">
                    중간중간 회고를 하거나 아니면 어떤 제품에서 어떤 기능을 조금
                    스펙 아웃하고 다른 기능을 좀 더 신경 써야 되지 않을까라는
                    것들을 볼 수 있게끔 하는 걸 추천함 사람이 하는 일이다 보니까
                    어쩔 수 없이 변동
                  </li>
                  <li className="des-item">
                    중간중간 회고를 하거나 아니면 어떤 제품에서 어떤 기능을 조금
                    스펙 아웃하고 다른 기능을 좀 더 신경 써야 되지 않을까라는
                    것들을 볼 수 있게끔 하는 걸 추천함 사람이 하는 일이다 보니까
                    어쩔 수 없이 변동
                  </li>
                  <li className="des-item">
                    중간중간 회고를 하거나 아니면 어떤 제품에서 어떤 기능을 조금
                    스펙 아웃하고 다른 기능을 좀 더 신경 써야 되지 않을까라는
                    것들을 볼 수 있게끔 하는 걸 추천함 사람이 하는 일이다 보니까
                    어쩔 수 없이 변동
                  </li>
                </ul>
              </div>
              <div className="des-wrap">
                <div className="des-timestamp">21:03</div>
                <div className="des-title">기획자의 문서 작성법</div>
                <ul className="des-list">
                  <li className="des-item">
                    중간중간 회고를 하거나 아니면 어떤 제품에서 어떤 기능을 조금
                    스펙 아웃하고 다른 기능을 좀 더 신경 써야 되지 않을까라는
                    것들을 볼 수 있게끔 하는 걸 추천함 사람이 하는 일이다 보니까
                    어쩔 수 없이 변동
                  </li>
                  <li className="des-item">
                    중간중간 회고를 하거나 아니면 어떤 제품에서 어떤 기능을 조금
                    스펙 아웃하고 다른 기능을 좀 더 신경 써야 되지 않을까라는
                    것들을 볼 수 있게끔 하는 걸 추천함 사람이 하는 일이다 보니까
                    어쩔 수 없이 변동
                  </li>
                  <li className="des-item">
                    중간중간 회고를 하거나 아니면 어떤 제품에서 어떤 기능을 조금
                    스펙 아웃하고 다른 기능을 좀 더 신경 써야 되지 않을까라는
                    것들을 볼 수 있게끔 하는 걸 추천함 사람이 하는 일이다 보니까
                    어쩔 수 없이 변동
                  </li>
                  <li className="des-item">
                    중간중간 회고를 하거나 아니면 어떤 제품에서 어떤 기능을 조금
                    스펙 아웃하고 다른 기능을 좀 더 신경 써야 되지 않을까라는
                    것들을 볼 수 있게끔 하는 걸 추천함 사람이 하는 일이다 보니까
                    어쩔 수 없이 변동
                  </li>
                  <li className="des-item">이얍</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="mini-side-bar">
      <img
        src={sidePanel}
        alt="side-panel"
        className="side-panel-icon"
        onClick={() => setIsSidebarOpen(true)}
      />
    </div>
  );
};

export default SideBar;
