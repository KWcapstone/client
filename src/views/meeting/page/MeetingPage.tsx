// style
import "@/views/main/style/project.sass";
import arrow from "@/assets/imgs/icon/arrow_down_black.svg";
import test from "@/assets/imgs/common/test.png";
import HeaderBar from "../components/HeaderBar";

const MeetingPage = () => {
  return (
    <>
      <HeaderBar />
      <div className="project-wrap">
        <div className="project-header">
          <div className="project-title">프로젝트 제목</div>
          <div className="project-info">
            <img src={test} alt="profile" />
            <span>유저 이름</span>
            <img src={arrow} alt="arrow" />
          </div>
        </div>
        <div className="project-content">
          <h1>회의 페이지</h1>
        </div>
      </div>
    </>
  );
};

export default MeetingPage;
