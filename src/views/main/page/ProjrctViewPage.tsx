// libraries
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// apis
import { getProjectView } from "@/api/main/projectView";

export default function ProjectViewPage() {
  const { projectID } = useParams<{ projectID: string }>();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setImageUrl(res?.data?.data?.imageUrl ?? null);
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
  if (!imageUrl) return <div style={{ padding: 16 }}>이미지 없음</div>;

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <img
        src={imageUrl}
        alt="project view"
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </div>
  );
}
