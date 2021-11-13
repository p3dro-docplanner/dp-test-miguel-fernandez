import { createSlice } from "@reduxjs/toolkit";
import appointmentService from "../../services/appointmentService";

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState: { appointment: "1991-01-12", changed: false, draft: "" },
  reducers: {
    updateAppointment(state, action) {
      appointmentService.addAppointment(state.draft).then(() => {});
      state.appointment = action.payload;
      state.changed = false;
      state.draft = "";
    },
    updateDraft(state, action) {
      console.log(action.payload);
      state.draft = action.payload;
      state.changed = true;
    },
    reset(state) {
      state.changed = false;
    },
  },
});

export const appointmentActions = appointmentSlice.actions;
