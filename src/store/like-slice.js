import { createSlice } from "@reduxjs/toolkit";

const initialLikeState = { likedPosts: [] };

const likeSlice = createSlice({
  name: "like",
  initialState: initialLikeState,
  reducers: {
    toggleLike(state, action) {
      const postAction = action.payload;
      console.log(JSON.stringify(state.likedPosts));
      // if (state.likedPosts.some((likedPost) => likedPost === post)) {
      if (
        state.likedPosts.find(
          (likedPost) =>
            likedPost.post === postAction.post &&
            likedPost.userId === postAction.userId
        )
      ) {
        state.likedPosts = state.likedPosts.filter(
          (likedPost) =>
            likedPost.post !== postAction.post &&
            likedPost.userId !== postAction.userId
        );
      } else {
        state.likedPosts.push(postAction);
        console.log("jsuis dans le ELSE");
      }
    },
  },
});

export default likeSlice;
export const likeActions = likeSlice.actions;
