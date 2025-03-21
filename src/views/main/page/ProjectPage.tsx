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
            <h2>전체 회의</h2>
            <div className="search-wrap">
              <input type="text" placeholder="회의명 검색" />
              <Link to="/meeting">새로 만들기</Link>
            </div>
          </div>
          <div className="sort-wrap">
            <div className="tab-wrap">
              <ul>
                <li className={tab === "all" ? "active" : ""} onClick={() => setTab("all")}>전체</li>
                <li className={tab === "mine" ? "active" : ""} onClick={() => setTab("mine")}>내 회의</li>
                <li className={tab === "invite" ? "active" : ""} onClick={() => setTab("invite")}>초대된 회의</li>
              </ul>
            </div>
            <div className="order-wrap">
              <button onClick={() => setShowOrder(!showOrder)}>{ order ? "최신순" : "오래된 순" }<img src={arrow}/></button>
              {
                showOrder &&
                <ul>
                  <li onClick={() => {setOrder(true); setShowOrder(false)}}>최신순</li>
                  <li onClick={() => {setOrder(false); setShowOrder(false)}}>오래된 순</li>
                </ul>
              }
            </div>
          </div>
        </div>
        <div className="card-wrap">
          <div className="card">
            <img src={test} alt="" />
            <div className="info-wrap">
              <div className="title-wrap">
                <div className="title">모아바 회의</div>
                <div className="date">2025/1/16</div>
              </div>
              <div className="owner-wrap">
                <div className="owner"><img src={test}/>모아바</div>
              </div>
            </div>
          </div>
          <div className="card">
            <img src={test} alt="" />
            <div className="info-wrap">
              <div className="title-wrap">
                <div className="title">모아바 회의</div>
                <div className="date">2025/1/16</div>
              </div>
              <div className="owner-wrap">
                <div className="owner"><img src={test}/>모아바</div>
              </div>
            </div>
          </div>
          <div className="card">
            <img src={test} alt="" />
            <div className="info-wrap">
              <div className="title-wrap">
                <div className="title">모아바 회의</div>
                <div className="date">2025/1/16</div>
              </div>
              <div className="owner-wrap">
                <div className="owner"><img src={test}/>모아바</div>
              </div>
            </div>
          </div>
          <div className="card">
            <img src={test} alt="" />
            <div className="info-wrap">
              <div className="title-wrap">
                <div className="title">모아바 회의</div>
                <div className="date">2025/1/16</div>
              </div>
              <div className="owner-wrap">
                <div className="owner"><img src={test}/>모아바</div>
              </div>
            </div>
          </div>
          <div className="card">
            <img src={test} alt="" />
            <div className="info-wrap">
              <div className="title-wrap">
                <div className="title">모아바 회의</div>
                <div className="date">2025/1/16</div>
              </div>
              <div className="owner-wrap">
                <div className="owner"><img src={test}/>모아바</div>
              </div>
            </div>
          </div>
          <div className="card">
            <img src={test} alt="" />
            <div className="info-wrap">
              <div className="title-wrap">
                <div className="title">모아바 회의</div>
                <div className="date">2025/1/16</div>
              </div>
              <div className="owner-wrap">
                <div className="owner"><img src={test}/>모아바</div>
              </div>
            </div>
          </div>
          <div className="card">
            <img src={test} alt="" />
            <div className="info-wrap">
              <div className="title-wrap">
                <div className="title">모아바 회의</div>
                <div className="date">2025/1/16</div>
              </div>
              <div className="owner-wrap">
                <div className="owner"><img src={test}/>모아바</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
