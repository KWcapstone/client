import "@/views/meeting/style/header-bar.sass";
import test from "@/assets/imgs/common/user.svg";
import home from "@/assets/imgs/icon/home.svg";
import dwn from "@/assets/imgs/icon/dwn_white.svg";
import { useNavigate } from "react-router-dom";

interface HeaderBarProps {
  onOpenModal: () => void;
}

const HeaderBar = ({ onOpenModal }: HeaderBarProps) => {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/project");
  };
  return (
    <div className="header-bar">
      <img
        src={home}
        alt="home"
        className="cursor-pointer"
        onClick={handleHomeClick}
      />
      <div className="right-section">
        <div className="share cursor-pointer" onClick={onOpenModal}>
          공유하기
        </div>
        <div className="user-pofiles">
          <div className="user-profile">
            <img src={test} alt="profile" />
          </div>
          <div className="user-profile">
            <img src={test} alt="profile" />
          </div>
          <div className="user-profile">
            <img src={test} alt="profile" />
          </div>
          <div className="user-profile">
            <img src={test} alt="profile" />
          </div>
          <div className="user-profile">
            <img src={test} alt="profile" />
          </div>
          <div className="user-profile more">+3</div>
          <hr className="divider" />
          <button className="add-user cursor-pointer">
            <img src={dwn} alt="add" className="add-icon" />
            <span className="add-text">다운받기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
