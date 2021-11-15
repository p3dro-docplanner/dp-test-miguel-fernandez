import moment from "moment";

export const groupsByDay = (appointments) => {
  
  if(appointments.length > 0) {
    let week = [];
    for( let i = 0 ; i < 7; i++ ){
      week.push(moment(appointments[0].Start).add(i, 'days').format('DD'));
    }
    return (
      appointments &&
      appointments.reduce((acc, date) => {
        const weekDay = `${moment(date.Start).format('DD')}`;
        if (!acc[weekDay]) {
          acc[weekDay] = [];
        }

        acc[weekDay].push(date);
        for (let i in week) {
          if (!acc.hasOwnProperty(week[i])) {
            acc[week[i]] = [];
          }
        }

        return acc;
      }, {})
    );
  }
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
