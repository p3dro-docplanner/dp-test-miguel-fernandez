import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import appointmentService from "../../services/appointmentService";
import { appointmentActions } from "../../store/slices/appointmentSlice";
import { groupsByDay, enumerateDaysBetweenDates } from "../../helpers/calendar";

export const Calendar = () => {
  const [appointments, setAppointments] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [iterator, setIterator] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const monday = moment().day(1).format("YYYYMMDD");
  const [dateFetch, setDateFetch] = useState(monday);
  const [loadingCalendar, setLoadingCalendar] = useState(true);

  const dispatch = useDispatch();
  const appointment = useSelector((state) => state.appointment.appointment);

  const nextWeek = moment(dateFetch).add(7, "days").format("YYYYMMDD");
  const previousWeek = moment(dateFetch).subtract(7, "days").format("YYYYMMDD");

  const modifyHandler = (data) =>
    dispatch(
      appointmentActions.updateDraft(data)
    );

  const groupByDay = groupsByDay(appointments);

  useEffect(() => {
    appointmentService
      .getAppointments(dateFetch)
      .then((response) => {
        setAppointments(response.data);
        setLoadingCalendar(false);
      })
      .catch((e) => {
        setLoadingCalendar(false);
      });
  }, [dateFetch]);

  const handleShowMore = () => setShowMore(!showMore);

  const handleOnClick = (dates) => modifyHandler(dates);

  const findDay = (date) => {
    const week = enumerateDaysBetweenDates(moment(monday), iterator);
    const filtered = week.filter((weekDay) => weekDay.day === date);
    return filtered && filtered[0];
  };

  const parseDateButton = (date) => moment(date.Start).format("HH:mm");

  const renderItems = (group) =>
    groupByDay[group].map((date, index) => {
      return (
        <Button
          type="primary"
          key={`${group} ${index}`}
          onClick={() =>
            handleOnClick({
              start: moment(date.Start).format("YYYY-MM-DD HH:mm:ss"),
              end: moment(date.End).format("YYYY-MM-DD HH:mm:ss"),
            })
          }
          disabled={
            date.Taken ||
            moment(date.Start).format("YYYY-MM-DD HH:mm:ss") === appointment ||
            moment().isAfter(moment(date.Start))
          }
          className="button-calendar"
        >
          {parseDateButton(date)}
        </Button>
      );
    });

  const handlerDates = (date, next = false) => {
    if (next) {
      setIterator(iterator + 1);
    } else {
      setIterator(iterator - 1);
    }
    setDateFetch(moment(date).format("YYYYMMDD"));
  };

  const handleNext = (date, next) => {
    handlerDates(date, next);
    setDisabled(false);
  };

  const handlePrevious = (date) => {
    handlerDates(date);
    if (iterator - 1 === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  return (
    <div className="current-appointment">
      {appointments.length > 0 && !loadingCalendar ? (
        <Row>
          <Button
            disabled={disabled}
            onClick={() => handlePrevious(previousWeek)}
          >
            <LeftOutlined />
          </Button>
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
          <Button onClick={() => handleNext(nextWeek, true)}>
            <RightOutlined />
          </Button>
        </Row>
      ) : !loadingCalendar ? (
        <div>No dates available</div>
      ) : (
        <div>Loading...</div>
      )}
      {appointments.length > 0 && (
        <div className={!showMore ? "button-more" : "button-less"}>
          <Button onClick={handleShowMore}>
            {showMore ? "Less" : "Show more hours"}
          </Button>
        </div>
      )}
    </div>
  );
};
