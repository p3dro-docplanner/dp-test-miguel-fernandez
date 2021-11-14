import React from "react";
import { render, screen } from "@testing-library/react";
import { Appointment } from "../index";
import { appointmentSlice } from "../../../store/slices/appointmentSlice";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: { appointment: appointmentSlice.reducer },
});

describe("Appointment Container", () => {
  test("renders appointment component", () => {
    render(
      <Provider store={store}>
        <Appointment />
      </Provider>
    );
    expect(screen.getByTestId("appointment")).toBeInTheDocument();
    expect(screen.getByTestId("appointment-current").textContent).toBe(
      "Confirm your appointment with Dr Simeon Molas"
    );
  });
});
