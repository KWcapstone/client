// style
import "@/views/meeting/style/meeting.sass";
import HeaderBar from "../components/HeaderBar";
import SideBar from "../components/SideBar";
import ShareModal from "@/views/components/ShareModal";
import MindMapComponent from "@/views/meeting/components/MindMapComponent.tsx";

import { useState, useRef } from "react";

const MeetingPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // 사이드바 상태
  const modalBackground = useRef<HTMLDivElement>(null);
  // modal
  type ModalType = "share" | null;
  const [modalType, setModalType] = useState<ModalType>(null);
  const closeModal = () => setModalType(null);
  const openModal = () => setModalType("share");

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
            <ShareModal onCloseModal={closeModal} />
          </div>
        )}
      </div>

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
        {/* <MyVoiceComponent /> */}
        <MindMapComponent />
      </div>
    </>
  );
};

export default MeetingPage;
