// 수정

// style
import "@/views/meeting/style/meeting.sass";

// import
import { useState, useRef, useEffect } from "react";

// api
import { getMeetingId } from "@/api/meeting/meeting";

// component
import TutorialModal from "@/views/meeting/components/TutorialModal";
import HeaderBar from "../components/HeaderBar";
import SideBar from "../components/SideBar";
import ShareModal from "@/views/components/ShareModal";
import MindMapComponent from "@/views/meeting/components/MindMapComponent.tsx";

// type
import { conferenceData, scriptionsData } from "@/types/conferanceData";
import { RealTimeSummaryData } from "@/types/realTimeSummaryData";

const MeetingPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // 사이드바 상태
  const modalBackground = useRef<HTMLDivElement>(null);
  const [scripts, setScripts] = useState<scriptionsData[]>([]); // 스크립트 상태
  const [summarys, setSummary] = useState<RealTimeSummaryData[]>([]); // 요약 상태
  const [conferenceData, setConferenceData] = useState<conferenceData>({
    projectId: "",
    projectName: "",
    imageUrl: "",
    updatedAt: "",
  });

  // modal
  type ModalType = "tutorial" | "share" | null;
  const [modalType, setModalType] = useState<ModalType>(null);
  const closeModal = () => setModalType(null);
  const openModal = () => setModalType("share");

  useEffect(() => {
    getMeetingId().then((res: any) => {
      setConferenceData(res.data.data);
      setModalType("tutorial");
    });
  }, []);

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
            <ShareModal
              onCloseModal={closeModal}
              projectId={conferenceData.projectId}
            />
          </div>
        )}
        {modalType === "tutorial" && (
          <div
            className="modal-container long pd-0"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeModal();
              }
            }}
          >
            <TutorialModal onCloseModal={closeModal} />
          </div>
        )}
      </div>

      <SideBar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        scripts={scripts}
        conferenceData={conferenceData}
        summarys={summarys}
      />

      <div
        className="project-content"
        style={{
          paddingLeft: isSidebarOpen ? "340px" : "56px", // 동적 패딩
        }}
      >
        <MindMapComponent
          setScripts={setScripts}
          conferenceData={conferenceData}
          setSummary={setSummary}
        />
      </div>
    </>
  );
};

export default MeetingPage;
