import React, { useContext } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
type AppContext = {
  isLoggedIn: boolean;
};
const AppContext = React.createContext<AppContext | undefined>(undefined);

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });

  return (
    <AppContext.Provider value={{ isLoggedIn: !isError }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  return context as AppContext;
}
