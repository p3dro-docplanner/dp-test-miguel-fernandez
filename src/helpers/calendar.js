import moment from "moment";

export const groupsByDay = (appointments) =>
  appointments &&
  appointments.reduce((acc, date) => {
    const weekDay = `${moment(date.Start).day()}`;

    if (!acc[weekDay]) {
      acc[weekDay] = [];
    }

    acc[weekDay].push(date);
    return acc;
  }, {});

export const formatDate = (date) => {
  const startDate = moment(date.Start);
  const endDate = moment(date.End);

  const hourStart = startDate.format("HH");

  const minutesStart = startDate.format("mm");
  const weekDay = startDate.format("ddd");

  const finalStart = startDate.format("YYYY-MM-DD HH:mm:ss");
  const finalEnd = endDate.format("YYYY-MM-DD HH:mm:ss");

  return {
    hourStart,
    minutesStart,
    weekDay,
    finalStart,
    finalEnd,
  };
};
