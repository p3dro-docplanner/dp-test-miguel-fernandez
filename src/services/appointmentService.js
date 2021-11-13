import axios from "axios";

class AppointmentService {
  getAppointments(date) {
    return axios
      .get(`${process.env.REACT_APP_API}/GetWeeklySlots/${date}`)
      .then((response) => {
        if (response) return response;
      });
  }
  addAppointment(dateStart) {
    return axios
      .post(`${process.env.REACT_APP_API}/BookSlot`, {
        Start: dateStart,
        End: "2022-05-12 09:50:00",
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
