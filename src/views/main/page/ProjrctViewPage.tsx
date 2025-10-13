// libraries
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// apis
import { getStatus, getProjectView } from "@/api/main/projectView";

// component
import SideBar from "../../meeting/components/SideBar";
import MindMapView from "../components/MindMapView";

// type
import { conferenceData, scriptionsData } from "@/types/conferanceData";
import { RealTimeSummaryData } from "@/types/realTimeSummaryData";

export default function ProjectViewPage() {
  const [status, setStatus] = useState<string>('Done');
  const navigate = useNavigate();
  const { projectID } = useParams<{ projectID: string }>();
  const [scripts, setScripts] = useState<scriptionsData[]>([]); // 스크립트 상태
  const [summarys, setSummary] = useState<RealTimeSummaryData[]>([]); // 요약 상태


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [conferenceData, setConferenceData] = useState<conferenceData>({
    projectId: "",
    projectName: "",
    imageUrl: "",
    updatedAt: "",
    scriptions: [],
    summary: { title: "", content: "" },
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // 사이드바 상태

  useEffect(() => {
    if (!projectID) {
      setError("projectID가 없습니다.");
      setLoading(false);
      return;
    }

    getStatus(projectID).then((res: any) => {
      let status = res.data.data.status
      if(status === "Before"){
        alert('회의가 시작 전입니다. 회의 시작 후 다시 접속해 주세요.')
        navigate("/project");
      } else if(status === "Processing") {
        setStatus(status)
      } else {
        setStatus(status)
        let cancelled = false;

        (async () => {
          try {
            setLoading(true);
            const res = await getProjectView(projectID); // axios라면 config도 가능

            if (cancelled) return;

            setConferenceData(res?.data?.data ?? {});
          } catch (e: any) {
            if (cancelled) return;
            setError(e?.message ?? "불러오기에 실패했습니다.");
          } finally {
            if (!cancelled) setLoading(false);
          }
        })();

        return () => {
          cancelled = true; // 언마운트/파라미터 변경 시 레이스 컨디션 방지
        };
      }
      console.log(res.data.data.status);
    });

  }, [projectID]);

  if (status === "Done" && loading) return <div style={{ padding: 16 }}>불러오는 중…</div>;
  if (status === "Done" && error) return <div style={{ padding: 16, color: "red" }}>{error}</div>;
  if (status === "Done" && !conferenceData.imageUrl)
    return <div style={{ padding: 16 }}>이미지 없음</div>;

  return (
    <>
      {
        status === "Done" ? (
          <>
            <SideBar
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              scripts={conferenceData.scriptions}
              conferenceData={conferenceData}
              summary={conferenceData.summary}
              view={true}
            />
            <div
              className="project-content"
              style={{
                paddingLeft: isSidebarOpen ? "340px" : "56px", // 동적 패딩
              }}
            >
              <img
                src={conferenceData.imageUrl}
                alt="project view"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
          </>
        ) : (
          <>
            <SideBar
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              scripts={scripts}
              conferenceData={conferenceData}
              summarys={summarys}
              view={true}
            />
            <div
              className="project-content"
              style={{
                paddingLeft: isSidebarOpen ? "340px" : "56px", // 동적 패딩
              }}
            >
              <MindMapView
                setScripts={setScripts}
                projectId={projectID ?? ""}
                setSummary={setSummary}
              />
            </div>
          </>
        )
      }
    </>
  );
}
