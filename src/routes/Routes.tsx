import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from 'views/main/page/MainPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={</>}/> */}
        <Route path="/home" element={<MainPage/>}>
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
