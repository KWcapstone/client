import "@/views/meeting/styles/header-bar.scss";
import test from "@/assets/imgs/common/test.png";
import home from "@/assets/imgs/icon/home.png";
import plus from "@/assets/imgs/icon/plus.png";

const HeaderBar = () => {
  return (
    <div className="header-bar">
      <img src={home} alt="home" className="home-icon" />
      <div className="right-section">
        <div className="share">공유하기</div>
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
          <hr className="divider" />
          <button className="add-user">
            <img src={plus} alt="add" className="add-icon" />
            <span className="add-text">다운받기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
