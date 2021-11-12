import { configureStore } from "@reduxjs/toolkit";
import { appointmentSlice } from "./slices/appointmentSlice";

const store = configureStore({
  reducer: { appointment: appointmentSlice.reducer },
});

export default store;
