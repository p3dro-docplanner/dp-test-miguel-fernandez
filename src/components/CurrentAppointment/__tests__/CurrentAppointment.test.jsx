import React from "react";
import { render, screen } from "@testing-library/react";
import { CurrentAppointment } from "../index";
import { appointmentSlice } from "../../../store/slices/appointmentSlice";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: { appointment: appointmentSlice.reducer },
});

let onActionMock = jest.fn();

beforeEach(function () {
  onActionMock.mockClear();
});

describe("Appointment Component", () => {
  test("renders appointment component", () => {
    render(
      <Provider store={store}>
        <CurrentAppointment formatDateAppointment={onActionMock} />
      </Provider>
    );
    expect(screen.getByTestId("appointment")).toBeInTheDocument();
    expect(screen.getByTestId("appointment-current").textContent).toBe(
      "Confirm your appointment with Dr Simeon Molas"
    );
  });
});
