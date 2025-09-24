export async function downloadAs(url: string, filename: string) {
  const res = await fetch(url, { mode: "cors" }); // S3 CORS에 GET/HEAD 허용 필요
  console.log(res);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const blob = await res.blob();
  const blobUrl = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.style.display = "none";
  a.href = blobUrl;
  a.download = filename; // ← 전달받은 파일명 그대로 사용
  document.body.appendChild(a); // (사파리 호환)
  a.click();
  a.remove();

  URL.revokeObjectURL(blobUrl); // 메모리 해제
}
