import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";

import { Label } from "../Label";
import { appointmentActions } from "../../store/slices/appointmentSlice";
import moment from "moment";

export const Reschedule = ({ formatDateAppointment }) => {
  const dispatch = useDispatch();
  const appointment = useSelector((state) => state.appointment);
  const newAppointment = formatDateAppointment(appointment.draft);
  const formatted = moment(appointment.draft);

  const modifyHandler = (data) => {
    dispatch(appointmentActions.changeLoading());
    setTimeout(() => {
      dispatch(appointmentActions.changeLoading());
      dispatch(
        appointmentActions.updateAppointment(data.format("YYYY-MM-DD HH:mm:ss"))
      );
    }, 5000);
  };

  const handleOnClick = () => modifyHandler(formatted);

  return appointment.changed ? (
    <div>
      <Label text={"Reschedule"} bold></Label>
      <Label text={"Click the button to confirm"}></Label>

      <Button className="confirm-button" type="primary" onClick={handleOnClick}>
        {newAppointment}
      </Button>
    </div>
  ) : (
    ""
  );
};
