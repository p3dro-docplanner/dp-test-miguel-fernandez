import axios from "axios";

class AppointmentService {
  getAppointments(date) {
    return axios
      .get(`${process.env.REACT_APP_API}/GetWeeklySlots/${date}`)
      .then((response) => {
        if (response) return response;
      });
  }
  addAppointment(date) {
    return axios
      .post(`${process.env.REACT_APP_API}/BookSlot`, {
        Start: date.start,
        End: date.end,
        Comments: "",
        Patient: {
          Name: "Miguel",
          SecondName: "Fernandez",
          Email: "test@gmail.com",
          Phone: "645353535",
        },
      })
      .then((response) => {
        if (response) return response;
      });
  }
}

export default new AppointmentService();
