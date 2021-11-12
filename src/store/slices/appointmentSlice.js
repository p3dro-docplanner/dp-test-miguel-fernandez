import { createSlice } from "@reduxjs/toolkit";

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState: { appointment: "1991-01-12", changed: false },
  reducers: {
    updateAppointment(state, action) {
      state.appointment = action.payload;
      state.changed = true;
    },
    reset(state) {
      state.changed = false;
    },
  },
});

export const appointmentActions = appointmentSlice.actions;
