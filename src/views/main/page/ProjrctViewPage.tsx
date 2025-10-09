// libraries
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// apis
import { getProjectView } from "@/api/main/projectView";

// component
import SideBar from "../../meeting/components/SideBar";

// type
import { conferenceData } from "@/types/conferanceData";

export default function ProjectViewPage() {
  const { projectID } = useParams<{ projectID: string }>();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [conferenceData, setConferenceData] = useState<conferenceData>({
    projectId: "",
    projectName: "",
    imageUrl: "",
    updateAt: "",
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

    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        const res = await getProjectView(projectID); // axios라면 config도 가능

        if (cancelled) return;

        setConferenceData(res?.data?.data ?? {});

        console.log("프로젝트 뷰", res?.data?.data);
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
  }, [projectID]);

  if (loading) return <div style={{ padding: 16 }}>불러오는 중…</div>;
  if (error) return <div style={{ padding: 16, color: "red" }}>{error}</div>;
  if (!conferenceData.imageUrl)
    return <div style={{ padding: 16 }}>이미지 없음</div>;

  return (
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
  );
}
