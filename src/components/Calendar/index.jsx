import React, { useState, useEffect } from "react";
import appointmentService from "../../services/appointmentService";
import {
  groupsByDay,
  parseDate,
  enumerateDaysBetweenDates,
  isWeekRange,
} from "../../helpers/calendar";
import { Row, Col, Button } from "antd";
import { useDispatch } from "react-redux";
import { appointmentActions } from "../../store/slices/appointmentSlice";

export const Calendar = () => {
  const [appointments, setAppointments] = useState([]);
  const [selected, setSelected] = useState("");
  const [showMore, setShowMore] = useState(false);
  const dispatch = useDispatch();

  const modifyHandler = (data) =>
    dispatch(appointmentActions.updateDraft(data));

  const groupByDay = groupsByDay(appointments);

  useEffect(() => {
    //control when click on next week
    appointmentService.getAppointments().then((response) => {
      const filteredWeek = filteredAppointments(response.data);
      setAppointments(filteredWeek);
    });
  }, []);

  const handleShowMore = () => setShowMore(!showMore);

  const handleOnClick = (date) => {
    modifyHandler(parseDate(date).format("YYYY-MM-DD HH:mm:ss"));
    setSelected(date);
  };

  const filteredAppointments = (data) =>
    data.filter((day) => true === isWeekRange(day));
  const findDay = (day) => {
    const week = enumerateDaysBetweenDates(parseDate(Date.now()));
    return week[day];
  };

  const parseDateButton = (date) => parseDate(date.Start).format("HH:mm");

  const renderItems = (group) =>
    groupByDay[group].map((date, index) => {
      return (
        <Button
          type="primary"
          key={`${group} ${index}`}
          onClick={() => handleOnClick(date.Start)}
          disabled={date.Taken}
          className="button-calendar"
        >
          {parseDateButton(date)}
        </Button>
      );
    });

  return (
    <div className="current-appointment">
      {appointments.length > 0 && (
        <Row>
          <Button>{"<"}</Button>
          {Object.keys(groupByDay).map((group, index) => {
            const date = findDay(group);
            return (
              <div key={index} className="calendar">
                <Col className={showMore ? "show-more" : "show-less"}>
                  <h5 className="week-day">{date && date.day}</h5>
                  <h5 className="date">
                    {date && `${date.number}  ${date.month}`}
                  </h5>
                  <div className={showMore ? "column-show-more" : "column"}>
                    {renderItems(group)}
                  </div>
                </Col>
              </div>
            );
          })}
          <Button>{">"}</Button>
        </Row>
      )}
      <div className={!showMore ? "button-more" : "button-less"}>
        <Button onClick={handleShowMore}>
          {showMore ? "Show less" : "Show more"}
        </Button>
      </div>
    </div>
  );
};
