import { Post, DataForEditPost } from "../../types/Post";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  posts: Array<Post>;
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  posts: [],
  isLoading: false,
  error: "",
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    postFetching(state) {
      state.isLoading = true;
    },
    postFetchingSuccess(state, action: PayloadAction<Post[]>) {
      state.isLoading = false;
      state.error = "";
      state.posts = action.payload;
    },
    postFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    postEdit(state, action: PayloadAction<DataForEditPost>) {
      const posts = [...state.posts];

      posts.forEach((post) => {
        if (post.id === action.payload.id) {
          post.title = action.payload.title;
        }
      });

      state.posts = posts;
    },
    addNewPost(state, action: PayloadAction<Post>) {
      const posts = [...state.posts];
      posts.unshift(action.payload);

      state.posts = posts;
    },
  },
});

export default postSlice.reducer;
