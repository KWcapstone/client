import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { postGoogleLogin } from "@/api/splash/socialLogin";
import AgreeModal from "@/views/splash/components/AgreeModal";

export default function GoogleRedirection() {
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const code = useMemo(() => search.get("code"), [search]); // 또는 new URL(window.location.href)...
  const [status, setStatus] = useState<number | null>(null);
  const [memberId, setMemberId] = useState<string | null>(null);

  // StrictMode에서 중복 호출 방지
  const calledRef = useRef(false);

  useEffect(() => {
    if (!code) {
      setStatus(-1);
      return;
    }
    if (calledRef.current) return; // 이미 호출함
    calledRef.current = true;

    let cancelled = false;
    // (선택) AbortController를 postGoogleLogin에 전달 가능하면 넣으세요.
    (async () => {
      try {
        const res = await postGoogleLogin(code);
        if (cancelled) return;

        const st = res.status;
        const data = res.data?.data;
        setStatus(st);
        setMemberId(data?.memberId ?? null);

        if (st === 200) {
          localStorage.setItem("accessToken", data?.accessToken ?? "");
          navigate("/project", { replace: true });
        }
        // st === 202 인 경우는 아래 렌더에서 모달 표시
      } catch (e) {
        if (cancelled) return;
        setStatus(-1);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [code, navigate]);

  // 로딩/결과 UI
  if (status === null) return <div>구글 로그인 중…</div>;
  if (status === 200) return <div>구글 로그인 중...</div>;
  if (status === 202)
    return (
      <div
        className="modal-container"
        onClick={(e) => {
          if (e.currentTarget === e.target) navigate(-1);
        }}
      >
        <AgreeModal
          onCloseModal={() => navigate(-1)}
          isGoogle={true}
          memberId={memberId!}
        />
      </div>
    );

  return <div>오류 발생</div>;
}
