import { createSlice } from "@reduxjs/toolkit";

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState: { appointment: "1991-01-12" },
  reducers: {
    updateAppointment(state, action) {
      state.appointment = action.payload;
    },
  },
});

export const appointmentActions = appointmentSlice.actions;
