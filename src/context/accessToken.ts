import { createContext } from "react";

interface AccessTokenContextType {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AccessTokenContext = createContext<AccessTokenContextType>(null!);
