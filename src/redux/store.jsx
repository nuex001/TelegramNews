import { configureStore } from "@reduxjs/toolkit";
import TnewsReducer from "./Tnews";
export default configureStore({
  reducer: {
    Tnews: TnewsReducer,
  },
});
