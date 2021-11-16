import { createSlice } from "@reduxjs/toolkit";
import appointmentService from "../../services/appointmentService";

const initialState = {
  appointment: "1991-01-12",
  changed: false,
  draft: {start: '', end: ''},
  loading: false,
};

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState: initialState,
  reducers: {
    updateAppointment(state, action) {
      appointmentService.addAppointment(state.draft);
      state.appointment = action.payload;
      state.changed = false;
      state.draft = initialState.draft;
    },
    updateDraft(state, action) {
      state.draft = action.payload;
      state.changed = true;
    },
    changeLoading(state) {
      state.loading = !state.loading;
    },
  },
});

export const appointmentActions = appointmentSlice.actions;
