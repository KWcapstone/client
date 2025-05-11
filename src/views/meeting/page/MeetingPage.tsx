// style
import "@/views/meeting/style/meeting.sass";
import HeaderBar from "../components/HeaderBar";
import SideBar from "../components/SideBar";
import MyVoiceComponent from "@/views/main/components/SttTest";

const MeetingPage = () => {
  return (
    <>
      <HeaderBar />
      <SideBar />

      <div className="project-content">
        <MyVoiceComponent />
      </div>
    </>
  );
};

export default MeetingPage;
