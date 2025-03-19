// style
import "@/views/main/style/side-bar.sass";

// component
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="side-wrap">
      <div className="top-wrap">
        <Link to="/meeting" className="logo-wrap">
          <img className="logo" src="@/assets/imgs/common/logo.svg" alt="LOGO" />
          <img className="title" src="@/assets/imgs/common/title.svg" alt="MOABA" />
        </Link>
        <button className="new"></button>
      </div>
      <div className="user-wrap">
        <img src="" alt="" />
        <div className="info-wrap">
          <div className="name">모아바</div>
          <div className="email">baek789@naver.com</div>
        </div>
      </div>
      <div className="list-wrap">
        <ul>
          <li>전체 회의</li>
          <li>녹음 파일</li>
          <li>요약본</li>
        </ul>
      </div>
      <div className="time-wrap">
        <p>남은 시간</p>
        <div className="time"><b>520분 남음</b> / 600분</div>
        <div className="bar"></div>
        <div className="remainder">다음 충전일까지 25일 남음</div>
      </div>
    </div>
  )
};

export default SideBar;
