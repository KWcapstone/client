import "@/views/meeting/style/side-bar.sass";
import sidePanel from "@/assets/imgs/icon/side_panel.svg";
import test from "@/assets/imgs/common/user.svg";

const SideBar = () => {
  return (
    <div className="side-bar">
      <div className="side-bar-wrap">
        <img src={sidePanel} alt="side-panel" className="side-panel-icon" />
        <div className="side-bar-title-wrap">
          <div className="side-bar-title">새회의</div>
          <div className="side-bar-detail">
            <div className="side-bar-date">
              <span className="date-title">회의일자</span>
              <span className="date-des">25.2.24 월 오후 11:47</span>
            </div>
            <div className="side-bar-creator">
              <span className="creator-title">생성자</span>
              <div className="creator-wrap">
                <img src={test} alt="creator" className="creator-icon" />
                <span className="creator-des">모아바</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="side-panel-text">사이드 패널</div>
    </div>
  );
};

export default SideBar;
