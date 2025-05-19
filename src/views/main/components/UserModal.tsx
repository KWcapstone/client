import "@/views/main/style/user-modal.sass";
import Modal from "@/views/components/modal";
import test from "@/assets/imgs/common/user.svg";

// api
import { getProfile, Withdraw, patchProfile } from "@/api/main/profile";
import { logout } from "@/api/splash/login";

// import
import { useState, useEffect } from "react";

// type
import { profileData } from "@/types/profileData";

//util
import { clearTokens } from "@/utils/auth";

interface UserModalProps {
  onCloseModal: () => void;
  onOpenChangePW: () => void;
}

const UserModal = ({ onCloseModal, onOpenChangePW }: UserModalProps) => {
  const [profile, setProfile] = useState<profileData>();
  const [isEdit, setIsEdit] = useState(false);
  const [editName, setEditName] = useState("");

  const clickEdit = () => {
    setEditName(profile?.name ?? "");
    setIsEdit(true);
  };

  const clickLogout = () => {
    logout().then(() => {
      alert("로그아웃 되었습니다.");
      clearTokens();
      window.location.href = "/";
    });
  };

  const clickWithdraw = () => {
    if (confirm("정말 계정을 삭제하시겠습니까?")) {
      Withdraw().then(() => {
        alert("계정이 정상적으로 삭제되었습니다.");
        clearTokens();
        window.location.href = "/";
      });
    }
  };

  const clickChangePW = () => {
    onOpenChangePW();
  };

  useEffect(() => {
    getProfile().then((res: any) => {
      setProfile(res.data.data);
    });
  }, []);

  useEffect(() => {
    if (profile?.name) setEditName(profile.name);
  }, [profile]);

  return (
    <Modal onCloseModal={onCloseModal}>
      <div className="modal-wrap">
        <div className="info-wrap">
          <div className="user-img">
            <img src={profile?.imageUrl ?? test} alt="" />
            <div className="edit-div" onClick={clickEdit}></div>
          </div>
          {isEdit ? (
            <input
              type="text"
              value={editName}
              className="title-rename-input"
              onChange={(e) => setEditName(e.target.value)}
              onBlur={() => setIsEdit(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const newName = e.currentTarget.value;
                  setIsEdit(false);
                  setEditName(newName);
                  patchProfile({
                    name: newName,
                    imageUrl: profile?.imageUrl ?? "",
                  } as profileData).then(() => {
                    console.log("프로필 변경 성공");
                    setProfile((prev) => prev && { ...prev, name: newName });
                    window.location.reload();
                  });
                }
              }}
            />
          ) : (
            <div className="user-name">{profile?.name}</div>
          )}
          <div className="user-email">{profile?.email}</div>
        </div>
        <ul className="edit-wrap">
          {/* <li className="mode-wrap"></li> */}
          <li className="log-out" onClick={clickLogout}>
            로그아웃
          </li>
          <li className="pwd-edit" onClick={clickChangePW}>
            비밀번호 변경
          </li>
        </ul>
        <button className="remove" onClick={clickWithdraw}>
          계정 삭제
        </button>
        <p>개인 정보 처리 방침・이용약관</p>
      </div>
    </Modal>
  );
};

export default UserModal;
