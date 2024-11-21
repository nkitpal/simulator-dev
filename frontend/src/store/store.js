import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./user";

export const store = configureStore({
  reducer: { myUser: usersSlice.reducer },
});
