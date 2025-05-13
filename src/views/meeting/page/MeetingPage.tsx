// style
import "@/views/meeting/style/meeting.sass";
import HeaderBar from "../components/HeaderBar";
import SideBar from "../components/SideBar";
import MyVoiceComponent from "@/views/meeting/components/SttTest";

import { useState } from "react";

const MeetingPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // 사이드바 상태

  return (
    <>
      <HeaderBar />
      <SideBar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div
        className="project-content"
        style={{
          paddingLeft: isSidebarOpen ? "340px" : "56px", // 동적 패딩
        }}
      >
        <MyVoiceComponent />
        
      </div>
    </>
  );
};

export default MeetingPage;
