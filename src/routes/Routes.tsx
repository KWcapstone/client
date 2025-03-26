import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProjectPage from "@/views/main/page/ProjectPage";
import SplashPage from "@/views/splash/page/SplashPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={</>}/> */}
        <Route path="/" element={<SplashPage />} />
        <Route path="project" element={<ProjectPage />} />
        {/*<Route path=":id" element={</>}/>
          </Route>
          <Route path="record" element={</>}/>
          <Route path="summary" element={</>}/> */}

        {/* <Route path="/meeting" element={</>}/> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
