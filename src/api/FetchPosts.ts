import { AppDispatch } from "../store/store";
import { Post } from "../types/Post";
import { postSlice } from "../store/reducers/PostSlice";

export const fetchPosts = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(postSlice.actions.postFetching());

    const response: Post[] = await fetch("data.json").then((res) => res.json());
    dispatch(postSlice.actions.postFetchingSuccess(response));
  } catch (error: any) {
    dispatch(postSlice.actions.postFetchingError(error.message));
  }
};
