// style
import "@/views/main/style/project.sass";
import arrowUp from "@/assets/imgs/icon/arrow_up_black.svg";
import arrowDown from "@/assets/imgs/icon/arrow_down_black.svg";
import test from "@/assets/imgs/common/test.png";

// component
import SideBar from "@/views/main/components/SideBar";

import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const ProjectPage = () => {
  const [tab, setTab] = useState<string>("all");
  const [order, setOrder] = useState<boolean>(true);
  const [showOrder, setShowOrder] = useState<boolean>(false);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const toggleMenu = (id: number) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  const dummyCards: any[] = [
    { id: 1, title: "모아바 회의", date: "2025/1/16", owner: "모아바", img: test },
    { id: 2, title: "모아바 회의", date: "2025/1/16", owner: "모아바", img: test },
  ];

  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const isInside = Array.from(cardRefs.current.values()).some((ref) =>
        ref.contains(e.target as Node)
      );
      if (!isInside) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
                <img src={showOrder ? arrowUp : arrowDown} className="order-img" />
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
          {dummyCards.map((card) => (
            <div className="card" key={card.id}>
              <img src={card.img} alt="" className="card-img" />
              <button
                className={`menu-btn ${openMenuId === card.id && "open"}`}
                onClick={() => toggleMenu(card.id)}
              >
              </button>
              {openMenuId === card.id && (
                <ul className="menu-wrap">
                  <li className="edit">이름 변경하기</li>
                  <li className="dwn">다운로드하기</li>
                  <li className="share">공유하기</li>
                  <li className="del">삭제하기</li>
                </ul>
              )}
              <div className="info-wrap">
                <div className="title-wrap">
                  <div className="title">{card.title}</div>
                  <div className="date">{card.date}</div>
                </div>
                <div className="owner-wrap">
                  <div className="owner">
                    <img src={card.img} className="owner-img" />
                    {card.owner}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
