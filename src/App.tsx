import Routes from "./routes/Routes";

import { useState } from "react";
import { AccessTokenContext } from "@/context/accessToken";

function App() {
  const [isLogin, setIsLogin] = useState(false) || null;

  return (
    <AccessTokenContext.Provider value={{ isLogin, setIsLogin }}>
      <Routes />
    </AccessTokenContext.Provider>
  );
}

export default App;
