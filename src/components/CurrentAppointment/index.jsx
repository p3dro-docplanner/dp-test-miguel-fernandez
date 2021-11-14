import React from "react";
import { CalendarOutlined } from "@ant-design/icons";
import {Spin} from 'antd'
import { Label } from "../Label";
import { useSelector } from "react-redux";

export const CurrentAppointment = ( { formatDateAppointment } ) => {
  const appointment = useSelector((state) => state.appointment.appointment);
  const loading = useSelector((state) => state.appointment.loading);

  return (
    <div data-testid="appointment">
      <div data-testid="appointment-current">
        Confirm your appointment with <strong>Dr Simeon Molas</strong>
      </div>
      <div data-testid="current" className="current-appointment">
      { !loading ? 
        <div><CalendarOutlined className="icon" />
          {formatDateAppointment(appointment)}
         </div>
          : 
          <div>
            <Spin className='margin-spin' size="small" />
            <del>{formatDateAppointment(appointment)}</del>
          </div>}
      </div>
      <Label text={"Did you have an unexpected situation?"} bold />
      <Label
        text={"You can change the appointment for when it suits you better"}
      />
    </div>
  );
};
