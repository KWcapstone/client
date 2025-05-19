// style
import "@/views/meeting/style/meeting.sass";
import HeaderBar from "../components/HeaderBar";
import SideBar from "../components/SideBar";
import ShareModal from "@/views/components/ShareModal";
import MindMapComponent from "@/views/meeting/components/MindMapComponent.tsx";

// import
import { useState, useRef, useEffect } from "react";

// api
import { getMeetingId } from "@/api/meeting/meeting";

// type
import { conferenceData } from "@/types/conferanceData";
import { RealTimeSummaryData } from "@/types/realTimeSummaryData";
interface scriptData {
  time: string;
  script: string;
}

const MeetingPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // 사이드바 상태
  const modalBackground = useRef<HTMLDivElement>(null);
  const [scripts, setScripts] = useState<scriptData[]>([]); // 스크립트 상태
  const [summarys, setSummary] = useState<RealTimeSummaryData[]>([]); // 요약 상태
  const [conferenceData, setConferenceData] = useState<conferenceData>({
    projectId: "",
    projectName: "",
    projectImage: null,
    updatedAt: "",
    creator: "",
  });

  // modal
  type ModalType = "share" | null;
  const [modalType, setModalType] = useState<ModalType>(null);
  const closeModal = () => setModalType(null);
  const openModal = () => setModalType("share");

  //console.log("projectId", projectId);

  useEffect(() => {
    getMeetingId().then((res: any) => {
      setConferenceData(res.data.data);
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
        {/* <MyVoiceComponent /> */}
        <MindMapComponent
          setScripts={setScripts}
          conferenceData={conferenceData}
          // setSummary={setSummary}
        />
      </div>
    </>
  );
};

export default MeetingPage;
