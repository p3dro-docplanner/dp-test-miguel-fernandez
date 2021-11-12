import axios from "axios";

class AppointmentService {
  getAppointments(date = "20211115") {
    return axios
      .get(`${process.env.REACT_APP_API}/GetWeeklySlots/${date}`)
      .then((response) => {
        if (response) return response;
      });
  }
}

export default new AppointmentService();
