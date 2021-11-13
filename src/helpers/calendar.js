import moment from "moment";

export const groupsByDay = (appointments) => {
  return (
    appointments &&
    appointments.reduce((acc, date) => {
      const weekDay = `${moment(date.Start).day() + 1}`;
      let array = ["0", "1", "2", "3", "4", "5", "6"];

      if (!acc[weekDay]) {
        acc[weekDay] = [];
      }

      acc[weekDay].push(date);
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

export const enumerateDaysBetweenDates = (date, iterator) => {
  const fromDate = moment(date.Start).add(7 * iterator, 'days');
  const toDate = moment().add(6 + (7 * iterator), "days");
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
  return parseDate(day.Start).isSameOrBefore(moment().add(6, "days"), "year");
};
