import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProjectPage from "@/views/main/page/ProjectPage";
import SplashPage from "@/views/splash/page/SplashPage";
import RecordPage from '@/views/main/page/RecordPage';
import SummaryPage from '@/views/main/page/SummaryPage';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/project" element={<ProjectPage />} />
        <Route path="/record" element={<RecordPage />} />
        <Route path="/summary" element={<SummaryPage />} />
        {/* <Route path="/meeting" element={</>}/> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
