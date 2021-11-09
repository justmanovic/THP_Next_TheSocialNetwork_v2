import { createSlice } from "@reduxjs/toolkit";

const initialLikeState = { likedPosts: [] };

const likeSlice = createSlice({
  name: "like",
  initialState: initialLikeState,
  reducers: {
    toggleLike(state, action) {
      const post = action.payload;
      if (state.likedPosts.includes(post)) {
        state.likedPosts = state.likedPosts.filter(
          (likedPost) => likedPost !== post
        );
      } else {
        state.likedPosts.push(post);
      }
    },
  },
});

export default likeSlice;
export const likeActions = likeSlice.actions;
