// style
import "@/views/meeting/style/meeting.sass";
import HeaderBar from "../components/HeaderBar";
import SideBar from "../components/SideBar";

const MeetingPage = () => {

  return (
    <>
      <HeaderBar />
      <SideBar />

      <div className="project-content">
        <h1>회의 페이지</h1>

      </div>
    </>
  );
};

export default MeetingPage;
