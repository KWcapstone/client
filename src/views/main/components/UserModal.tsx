import "@/views/main/style/user-modal.sass";
import Modal from "@/views/components/modal";
import test from "@/assets/imgs/common/user.svg";

// api
import { getProfile } from "@/api/main/profile";
import { logout } from "@/api/splash/login";

// import
import { useState, useEffect } from "react";

// type
import { profileData } from "@/types/profileData";

//util
import { clearTokens } from "@/utils/auth";

interface UserModalProps {
  onCloseModal: () => void;
}

const UserModal = ({
  onCloseModal,
}: UserModalProps) => {

  const [profile, setProfile] = useState<profileData>();

  const clickLogout = () => {
    logout().then(()=>{
      alert('로그아웃 되었습니다.')
      clearTokens();
      window.location.href = '/'
    });
  }

  useEffect(() => {
    getProfile().then((res: any) => {
      setProfile(res.data.data);
    });
  },[]);

  return (
    <Modal onCloseModal={onCloseModal}>
      <div className="modal-wrap">
        <div className="info-wrap">
          <div className="user-img">
            <img src={profile?.imageUrl ?? test} alt="" />
          </div>
          <div className="user-name">{profile?.name}</div>
          <div className="user-email">{profile?.email}</div>
        </div>
        <ul className="edit-wrap">
          {/* <li className="mode-wrap"></li> */}
          <li className="log-out" onClick={clickLogout}>로그아웃</li>
          <li className="pwd-edit">비밀번호 변경</li>
        </ul>
        <button className="remove">계정 삭제</button>
        <p>개인 정보 처리 방침・이용약관</p>
      </div>
    </Modal>
  );
};

export default UserModal;
