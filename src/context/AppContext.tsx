import React, { useContext, useState } from "react";

export const AppContext = React.createContext<any>("");

type paramsType = {
  params: any;
};

export function useAppContext() {
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error("useModalContext must be used within a AuthProvider");
  }
  return appContext;
}

export const AppContextProvider: React.FC<{ children: any }> = ({
  children,
}) => {
  const [appParameters, setAppParameters] = useState({
    params: {},
  });

  const changeAppParameters = (params: paramsType) => {
    setAppParameters(prevParams => ({
      ...prevParams,
      ...params
    }));
  };

  return (
    <AppContext.Provider
      value={{
        isAuth: false,
        changeAppParameters,
        appParameters,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
