// style
import "@/views/main/style/side-bar.sass";
import logo from "@/assets/imgs/common/logo.svg";
import test from "@/assets/imgs/common/user.svg";

// api
import { getProfile } from "@/api/main/profile";

// type
import { profileData } from "@/types/profileData";

// component
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

import UserModal from "@/views/main/components/UserModal";
import PasswordChangeModal from "@/views/main/components/ChangePWModal";

const SideBar = () => {
  const [sort, setSort] = useState<string>("/");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  type ModalType = "user" | "changePW" | null;
  const [modalType, setModalType] = useState<ModalType>(null);
  const closeModal = () => setModalType(null);
  const openChangePWModal = () => setModalType("changePW");
  const openUserModal = () => setModalType("user");

  const [profile, setProfile] = useState<profileData>();

  useEffect(() => {
    getProfile().then((res: any) => {
      setProfile(res.data.data);
    });
  }, []);

  useEffect(() => {
    if (pathname === "/" || pathname === "/project") {
      setSort("/project");
    } else if (pathname === "/record") {
      setSort("/record");
    } else {
      setSort("/summary");
    }
  }, [pathname]);

  return (
    <>
      <div className="side-wrap">
        <div className="top-wrap">
          <Link to="/" className="logo-wrap">
            <img src={logo} alt="LOGO" />
          </Link>
          <button className="new"></button>
        </div>
        <div className="user-wrap">
          <div className="user" onClick={openUserModal}>
            <img
              src={profile?.imageUrl ? profile?.imageUrl : test}
              className="user-profile-img"
              alt=""
            />
            <div className="info-wrap">
              <div className="name">{profile?.name}</div>
              <div className="email">{profile?.email}</div>
            </div>
          </div>
        </div>
        <div className="list-wrap">
          <ul>
            <li
              className={`list-li project ${
                sort === "/project" ? "active" : ""
              }`}
              onClick={() => navigate("/project")}
            >
              전체 회의
            </li>
            <li
              className={`list-li record ${sort === "/record" ? "active" : ""}`}
              onClick={() => navigate("/record")}
            >
              음성・스크립트
            </li>
            <li
              className={`list-li summary ${
                sort === "/summary" ? "active" : ""
              }`}
              onClick={() => navigate("/summary")}
            >
              <span>요약본</span>
            </li>
          </ul>
        </div>
        <div className="time-wrap">
          <p className="time-wrap-p">남은 시간</p>
          <div className="time">
            <b className="time-b">{profile?.time ?? 0}분 남음</b> / 600분
          </div>
          <div className="bar">
            <div className="status"></div>
          </div>
          <div className="remainder">
            다음 충전일까지 {profile?.date ?? 0}일 남음
          </div>
        </div>
      </div>
      {modalType === "user" && (
        <div
          className="modal-container short"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <UserModal
            onCloseModal={closeModal}
            onOpenChangePW={openChangePWModal}
          />
        </div>
      )}
      {modalType === "changePW" && (
        <div
          className="modal-container"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <PasswordChangeModal
            onCloseModal={closeModal}
            onOpenUserModal={openUserModal}
          />
        </div>
      )}
    </>
  );
};

export default SideBar;
