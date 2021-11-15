import moment from "moment";

export const groupsByDay = (appointments) => {
  
  if(appointments.length > 0) {
    let week = [];
    for( let i = 1 ; i < 8; i++ ){
      week.push(i);
    }
    return (appointments.reduce((acc, date) => {
        const weekDay = `${moment(date.Start).day()}`;

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
  const fromDate = moment(date.Start).add(7 * iterator, 'days');
  const toDate = moment().add(7 + (7 * iterator), "days");

  const now = fromDate,
    dates = [];

  while (now.isSameOrBefore(toDate)) {
    let obj = {};
    obj = {
      number: now.format("DD"),
      month: now.format("MMM"),
      day: now.format("ddd"),
      i: now.day() === 0 ? 7 : now.day()
    };
    dates.push(obj);
    now.add(1, "days");
  }
  return dates;
};

export const isWeekRange = (day) =>  moment(day.Start).isSameOrBefore(moment().add(6, "days"), "year");
