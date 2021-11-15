import moment from "moment";

export const groupsByDay = (appointments) => {
  if(appointments.length > 0) {
    let week = [];
    for( let i = 0 ; i < 7; i++ ){
      week.push(moment(appointments[0].Start).add(i, 'days').format('ddd'));
    }
    
    return (
      appointments.reduce((acc, date) => {
        const weekDay = `${moment(date.Start).format('ddd')}`;
        if (!acc[weekDay]) {
          acc[weekDay] = [];
        }

        acc[weekDay].push(date);
        for (let day of week) {
          if (!acc.hasOwnProperty(day)) {
            acc[day] = [];
          }
        }

        return acc;
      }, {})
    );
  }
};

export const enumerateDaysBetweenDates = (date, iterator) => {
  const fromDate = moment(date).add(7 * iterator, 'days');
  const toDate = moment(fromDate).add(6, "days");
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