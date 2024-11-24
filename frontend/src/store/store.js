import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./user";
import { leaderboarSlice } from "./leaderboard";

export const store = configureStore({
  reducer: {
    myUser: usersSlice.reducer,
    myLeaderboard: leaderboarSlice.reducer,
  },
});
