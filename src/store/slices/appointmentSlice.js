import { createSlice } from "@reduxjs/toolkit";
import appointmentService from "../../services/appointmentService";

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState: { appointment: "1991-01-12", changed: false, draft: "", loading: false },
  reducers: {
    updateAppointment(state, action) {
      appointmentService.addAppointment(state.draft);
      state.appointment = action.payload;
      state.changed = false;
      state.draft = "";
    },
    updateDraft(state, action) {
      state.draft = action.payload;
      state.changed = true;
    },
    changeLoading(state){
      state.loading = !state.loading;
    }
  },
});

export const appointmentActions = appointmentSlice.actions;
