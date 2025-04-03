// style
import "@/views/main/style/project.sass";
import arrow from "@/assets/imgs/icon/arrow_down_black.svg";
import test from "@/assets/imgs/common/test.png";

// component
import SideBar from "@/views/main/components/SideBar";

import { useState } from "react";
import { Link } from "react-router-dom";

const ProjectPage = () => {
  const [tab, setTab] = useState<string>("all");
  const [order, setOrder] = useState<boolean>(true);
  const [showOrder, setShowOrder] = useState<boolean>(false);

  return (
    <div className="main">
      <SideBar />
      <div className="project-wrap">
        <div className="nevigation-wrap">
          <div className="title-wrap">
            <h2 className="title-wrap-h2">전체 회의</h2>
            <div className="search-wrap">
              <input
                type="text"
                placeholder="회의명 검색"
                className="search-input"
              />
              <Link to="/meeting">새로 만들기</Link>
            </div>
          </div>
          <div className="sort-wrap">
            <div className="tab-wrap">
              <ul className="tab-ul">
                <li
                  className={tab === "all" ? "tab-li active" : "tab-li"}
                  onClick={() => setTab("all")}
                >
                  전체
                </li>
                <li
                  className={tab === "mine" ? "tab-li active" : "tab-li"}
                  onClick={() => setTab("mine")}
                >
                  내 회의
                </li>
                <li
                  className={tab === "invite" ? "tab-li active" : "tab-li"}
                  onClick={() => setTab("invite")}
                >
                  초대된 회의
                </li>
              </ul>
            </div>
            <div className="order-wrap">
              <button
                onClick={() => setShowOrder(!showOrder)}
                className="order-button"
              >
                {order ? "최신순" : "오래된 순"}
                <img src={arrow} className="order-img" />
              </button>
              {showOrder && (
                <ul className="order-ul">
                  <li
                    onClick={() => {
                      setOrder(true);
                      setShowOrder(false);
                    }}
                    className="order-li"
                  >
                    최신순
                  </li>
                  <li
                    onClick={() => {
                      setOrder(false);
                      setShowOrder(false);
                    }}
                    className="order-li"
                  >
                    오래된 순
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="card-wrap">
          <div className="card">
            <img src={test} alt="" className="card-img" />
            <div className="info-wrap">
              <div className="title-wrap">
                <div className="title">모아바 회의</div>
                <div className="date">2025/1/16</div>
              </div>
              <div className="owner-wrap">
                <div className="owner">
                  <img src={test} className="owner-img" />
                  모아바
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <img src={test} alt="" className="card-img" />
            <div className="info-wrap">
              <div className="title-wrap">
                <div className="title">모아바 회의</div>
                <div className="date">2025/1/16</div>
              </div>
              <div className="owner-wrap">
                <div className="owner">
                  <img src={test} className="owner-img" />
                  모아바
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <img src={test} alt="" className="card-img" />
            <div className="info-wrap">
              <div className="title-wrap">
                <div className="title">모아바 회의</div>
                <div className="date">2025/1/16</div>
              </div>
              <div className="owner-wrap">
                <div className="owner">
                  <img src={test} className="owner-img" />
                  모아바
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <img src={test} alt="" className="card-img" />
            <div className="info-wrap">
              <div className="title-wrap">
                <div className="title">모아바 회의</div>
                <div className="date">2025/1/16</div>
              </div>
              <div className="owner-wrap">
                <div className="owner">
                  <img src={test} className="owner-img" />
                  모아바
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <img src={test} alt="" className="card-img" />
            <div className="info-wrap">
              <div className="title-wrap">
                <div className="title">모아바 회의</div>
                <div className="date">2025/1/16</div>
              </div>
              <div className="owner-wrap">
                <div className="owner">
                  <img src={test} className="owner-img" />
                  모아바
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <img src={test} alt="" className="card-img" />
            <div className="info-wrap">
              <div className="title-wrap">
                <div className="title">모아바 회의</div>
                <div className="date">2025/1/16</div>
              </div>
              <div className="owner-wrap">
                <div className="owner">
                  <img src={test} className="owner-img" />
                  모아바
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <img src={test} alt="" className="card-img" />
            <div className="info-wrap">
              <div className="title-wrap">
                <div className="title">모아바 회의</div>
                <div className="date">2025/1/16</div>
              </div>
              <div className="owner-wrap">
                <div className="owner">
                  <img src={test} className="owner-img" />
                  모아바
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <img src={test} alt="" className="card-img" />
            <div className="info-wrap">
              <div className="title-wrap">
                <div className="title">모아바 회의</div>
                <div className="date">2025/1/16</div>
              </div>
              <div className="owner-wrap">
                <div className="owner">
                  <img src={test} className="owner-img" />
                  모아바
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
