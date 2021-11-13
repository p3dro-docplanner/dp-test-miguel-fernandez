import moment from "moment";

const STANDARD_FORMAT_DATE = "YYYY-MM-DD";

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

export const parseDate = (date) => {
  return moment(date);
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

export const isWeekRange = (day) => {
  /*   console.log(moment().format("YYYY-MM-DD"));
  console.log(moment().add(5, "days").format("YYYY-MM-DD"));
  // true

  return moment("2021-11-15").isBetween(
    moment().format("YYYY-MM-DD"),
    "2021-11-17"
  );*/
  return (
    parseDate(day).format(STANDARD_FORMAT_DATE) >=
      moment().format(STANDARD_FORMAT_DATE) &&
    parseDate(day).format(STANDARD_FORMAT_DATE) <=
      moment().add(6, "days").format(STANDARD_FORMAT_DATE)
  );
};
