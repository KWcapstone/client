// style
import "@/views/meeting/style/meeting.sass";
import HeaderBar from "../components/HeaderBar";
import SideBar from "../components/SideBar";
import ShareModal from "@/views/components/ShareModal";
import MindMapComponent from "@/views/meeting/components/MindMapComponent.tsx";

// import
import { useState, useRef, useEffect } from "react";

interface scriptData {
  time: string;
  script: string;
}

const MeetingPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // 사이드바 상태
  const modalBackground = useRef<HTMLDivElement>(null);
  const [scripts, setScripts] = useState<scriptData[]>([]); // 스크립트 상태

  // modal
  type ModalType = "share" | null;
  const [modalType, setModalType] = useState<ModalType>(null);
  const closeModal = () => setModalType(null);
  const openModal = () => setModalType("share");

  const projectId: string[] = ["67e7aedf96cc842290b68950"]; //임시방편

  return (
    <>
      <HeaderBar onOpenModal={openModal} />
      <div ref={modalBackground}>
        {modalType === "share" && (
          <div
            className="modal-container"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeModal();
              }
            }}
          >
            <ShareModal onCloseModal={closeModal} projectId={projectId} />
          </div>
        )}
      </div>

      <SideBar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        scripts={scripts}
      />

      <div
        className="project-content"
        style={{
          paddingLeft: isSidebarOpen ? "340px" : "56px", // 동적 패딩
        }}
      >
        {/* <MyVoiceComponent /> */}
        <MindMapComponent  setScripts={setScripts} />
      </div>
    </>
  );
};

export default MeetingPage;
