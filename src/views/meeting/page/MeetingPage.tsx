// style
import "@/views/meeting/style/meeting.sass";
import arrow from "@/assets/imgs/icon/arrow_down_black.svg";
import test from "@/assets/imgs/common/test.png";
import HeaderBar from "../components/HeaderBar";

const MeetingPage = () => {
  return (
    <>
      <HeaderBar />

      <div className="project-content">
        <h1>회의 페이지</h1>
      </div>
    </>
  );
};

export default MeetingPage;
