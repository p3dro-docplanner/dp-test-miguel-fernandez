import moment from "moment";

const STANDARD_FORMAT_DATE = "YYYY-MM-DD HH:mm:ss";

export const groupsByDay = (appointments) => {
  return (
    appointments &&
    appointments.reduce((acc, date) => {
      const weekDay = `${moment(date.Start).day() + 2}`;

      if (!acc[weekDay]) {
        acc[weekDay] = [];
      }

      acc[weekDay].push(date);
      let array = ["0", "1", "2", "3", "4", "5", "6"];
      for (let i in array) {
        if (!acc.hasOwnProperty(i)) {
          acc[i] = [];
        }
      }

      return acc;
    }, {})
  );
};

//buscar una forma más rápida
export const formatDate = (date) => {
  const startDate = moment(date.Start);
  const endDate = moment(date.End);

  const hourStart = startDate.format("HH");
  const day = startDate.format("DD");
  const month = startDate.format("MMM");

  const minutesStart = startDate.format("mm");
  const weekDay = startDate.format("ddd");

  const finalStart = startDate.format("YYYY-MM-DD HH:mm:ss");
  const finalEnd = endDate.format("YYYY-MM-DD HH:mm:ss");

  return {
    hourStart,
    day,
    month,
    minutesStart,
    weekDay,
    finalStart,
    finalEnd,
  };
};

export const enumerateDaysBetweenDates = (date) => {
  const fromDate = moment(date.Start);
  const toDate = moment().add(6, "days");
  const now = fromDate,
    dates = [];

  while (now.isSameOrBefore(toDate)) {
    let obj = {};
    obj = {
      number: now.format("DD"),
      month: now.format("MMM"),
      day: now.format("ddd"),
    };
    dates.push(obj);
    now.add(1, "days");
  }
  return dates;
};

export const isWeekRange = (day) =>
  formatDate(day).finalStart >= moment().format(STANDARD_FORMAT_DATE) &&
  formatDate(day).finalStart <
    moment().add(6, "days").format(STANDARD_FORMAT_DATE);
