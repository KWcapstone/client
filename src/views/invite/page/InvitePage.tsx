import { useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

import { getInvite } from "@/api/common/shareProject";

const InvitePage = () => {
  const { projectID } = useParams();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    if (projectID && code) {
      getInvite(projectID, code)
        .then((res: any) => {
          if (res.data.status === 200) {
            alert("초대 수락 완료.");
            navigate("/project");
          } else if (res.data.status === 401) {
            alert("로그인 후 초대 수락이 가능합니다.");
          }
        })
        .catch((error) => {
          console.error("Error fetching summary:", error);
          if (error.status === 401) {
            alert("로그인 후 초대 수락이 가능합니다.");
            navigate("/");
          }
        });
    }
  }, [projectID, code]);

  return <div className="invite-page"></div>;
};
export default InvitePage;
