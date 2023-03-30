import { configureStore } from "@redux/toolkit";
import { userReducer } from "../data/user/user.slice";

export const store = configureStore({
  reducers: {
    user: userReducer
  }
});

