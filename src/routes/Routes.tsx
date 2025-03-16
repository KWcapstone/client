import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProjectPage from '@/views/main/page/ProjectPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={</>}/> */}
        <Route path="/home" element={<ProjectPage />}>
          {/* <Route path="project" element={</>}>
            <Route path=":id" element={</>}/>
          </Route>
          <Route path="record" element={</>}/>
          <Route path="summary" element={</>}/> */}
        </Route>
        {/* <Route path="/meeting" element={</>}/> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
