import React from "react";
import { render, screen } from "@testing-library/react";
import { Appointment } from "../index";

describe("Appointment Component", () => {
  test("renders appointment component", () => {
    render(<Appointment />);
    expect(screen.getByTestId("appointment")).toBeInTheDocument();
    expect(screen.getByTestId("appointment-current").textContent).toBe(
      "Confirm your appointment with Dr Simeon Molas"
    );
  });
});
