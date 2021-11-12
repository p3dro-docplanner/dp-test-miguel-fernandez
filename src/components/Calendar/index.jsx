import React, {useState, useEffect} from 'react'
import appointmentService from '../../services/appointmentService';

export const Calendar = () => {

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        appointmentService.getAppointments().then((response) => {
          console.log(response.data);
          setAppointments(response.data);
        });
      }, []);

    return (
        <div>
            {appointments.length > 0 ? <div>Loaded</div> : <div>No load</div>}
        </div>
    )
}
