// style
import "@/views/main/style/project.sass";
import arrowUp from "@/assets/imgs/icon/arrow_up_black.svg";
import arrowDown from "@/assets/imgs/icon/arrow_down_black.svg";
import test from "@/assets/imgs/common/user.svg";

// api
import { getSearch, patchProjectName } from "@/api/common/common";
import { getProject, deleteProject } from "@/api/main/project";

// component
import SideBar from "@/views/main/components/SideBar";
import DwnModal from "@/views/main/components/DwnModal";
import ShareModal from "@/views/components/ShareModal";

// import
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

// type
import { projectData } from "@/types/projectData";

const ProjectPage = () => {
  // value
  const [keyword, setKeyword] = useState<string>("");
  const [tap, setTap] = useState<string>("all");
  const [order, setOrder] = useState<string>("latest");
  const [showOrder, setShowOrder] = useState<boolean>(false);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [projectList, setProjectList] = useState<Array<projectData>>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const menuRef = useRef<HTMLUListElement | null>(null);
  const orderRef = useRef<HTMLDivElement | null>(null);

  // modal
  type ModalType = "dwn" | "share" | null;
  const [modalType, setModalType] = useState<ModalType>(null);
  const [projectId, setProjectId] = useState<string[]>([]);
  const closeModal = () => setModalType(null);

  // function
  const toggleMenu = (id: number) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  const clickProjectDelete = (projectID: Array<string>) => {
    if (confirm("정말 프로젝트를 삭제하시겠습니까?")) {
      const updatedList = [{ projectId: projectID, type: "project" }];

      deleteProject(updatedList).then(() => {
        alert("프로젝트가 정상적으로 삭제되었습니다.");
        getProjectList()
      });
    }
  };

  const getSearchList = () => {
    setTap("all");
    setOrder("latest");

    let params = {
      tap: "entire",
      keyword: keyword,
    };
    getSearch(params)
      .then((res: any) => {
        setProjectList(res.data.data);
      })
      .catch(() => {
        setProjectList([]);
      });
  };

  const getProjectList = () => {
    let params = {
      sort: order,
      filterType: tap,
    };
    getProject(params).then((res: any) => {
      setProjectList(res.data.data);
    });
  };

  useEffect(() => {
    getProjectList();
  }, [order, tap]);

  useEffect(() => {
    const menuClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };

    const orderClickOutside = (e: MouseEvent) => {
      if (orderRef.current && !orderRef.current.contains(e.target as Node)) {
        setShowOrder(false);
      }
    };

    document.addEventListener("mousedown", menuClickOutside);
    document.addEventListener("mousedown", orderClickOutside);

    return () => {
      document.removeEventListener("mousedown", menuClickOutside);
      document.removeEventListener("mousedown", orderClickOutside);
    };
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
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    getSearchList();
                  }
                }}
              />
              <Link to="/meeting">새로 만들기</Link>
            </div>
          </div>
          <div className="sort-wrap">
            <div className="tap-wrap">
              <ul className="tap-ul">
                <li
                  className={tap === "all" ? "tap-li active" : "tap-li"}
                  onClick={() => setTap("all")}
                >
                  전체
                </li>
                <li
                  className={tap === "my" ? "tap-li active" : "tap-li"}
                  onClick={() => setTap("my")}
                >
                  내 회의
                </li>
                <li
                  className={tap === "invited" ? "tap-li active" : "tap-li"}
                  onClick={() => setTap("invited")}
                >
                  초대된 회의
                </li>
              </ul>
            </div>
            <div className="order-wrap" ref={orderRef}>
              <button
                onClick={() => setShowOrder(!showOrder)}
                className="order-button"
              >
                {order === "latest" ? "최신순" : "오래된 순"}
                <img
                  src={showOrder ? arrowUp : arrowDown}
                  className="order-img"
                />
              </button>
              {showOrder && (
                <ul className="order-ul">
                  <li
                    onClick={() => {
                      setOrder("latest");
                      setShowOrder(false);
                    }}
                    className="order-li"
                  >
                    최신순
                  </li>
                  <li
                    onClick={() => {
                      setOrder("created");
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
          {projectList &&
            projectList.map((list: projectData, i: number) => (
              <Link to={`${list.projectId}`} className="card" key={i}>
                <img src={list.imageUrl} alt="" className="card-img" />
                <button
                  className={`menu-btn ${openMenuId === i && "open"}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleMenu(i);
                  }}
                ></button>
                {openMenuId === i && (
                  <ul className="menu-wrap" ref={menuRef}>
                    <li
                      className="edit"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setEditingIndex(i);
                        setEditedTitle(list.projectName); // 현재 이름으로 초기화
                      }}
                    >
                      이름 변경하기
                    </li>
                    <li
                      className="dwn"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setModalType("dwn");
                        setOpenMenuId(null);
                        setProjectId(list.projectId);
                      }}
                    >
                      다운로드하기
                    </li>
                    <li
                      className="share"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setModalType("share");
                        setOpenMenuId(null);
                        setProjectId(list.projectId);
                      }}
                    >
                      공유하기
                    </li>
                    <li
                      className="del"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        clickProjectDelete(list.projectId);
                        setOpenMenuId(null);
                        setProjectId(list.projectId);
                      }}
                    >
                      삭제하기
                    </li>
                  </ul>
                )}
                <div className="info-wrap">
                  <div className="title-wrap">
                    {editingIndex === i ? (
                      <input
                        type="text"
                        value={editedTitle}
                        className="title-rename-input"
                        onChange={(e) => setEditedTitle(e.target.value)}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            const newList = [...projectList];
                            newList[i].projectName = editedTitle;
                            setProjectList(newList);
                            setEditingIndex(null);

                            patchProjectName(list.projectId, editedTitle)
                              .then(() => {
                                console.log("이름 변경 성공");
                              })
                              .catch(() => {
                                console.log("이름 변경 실패");
                              });
                          }
                        }}
                      />
                    ) : (
                      <div className="title">{list.projectName}</div>
                    )}
                    <div className="date">
                      {new Date(list.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="owner-wrap">
                    <div className="owner">
                      <img src={test} className="owner-img" />
                      {list.creator}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
      {modalType === "dwn" && (
        <div
          className="modal-container"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <DwnModal onCloseModal={closeModal} />
        </div>
      )}
      {modalType === "share" && (
        <div
          className="modal-container"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <ShareModal onCloseModal={closeModal} projectId={projectId} />
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
