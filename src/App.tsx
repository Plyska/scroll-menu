import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import List from "./components/List";
import Details from "./components/Details";
import { styles } from "./styles";
import { fetchPosts } from "./api/FetchPosts";
import { AppContextProvider } from "./context/AppContext";
import CircularProgress from "@mui/material/CircularProgress";
import CustomButton from "./components/CustomButton";
import ModalAddPost from "./components/ModalAddPost";

import { useAppSelector, useAppDispatch } from "./hooks/redux";

function App() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  return (
    <AppContextProvider>
      {isLoading ? (
        <Box sx={styles.loaderBox}>
          <CircularProgress size={100} />
        </Box>
      ) : (
        <Box sx={styles.container}>
          <List />
          <Details />
          <CustomButton />
          <ModalAddPost />
        </Box>
      )}
    </AppContextProvider>
  );
}

export default App;
