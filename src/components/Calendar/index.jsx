import React, { useState, useEffect } from "react";
import appointmentService from "../../services/appointmentService";
import {
  groupsByDay,
  parseDate,
  enumerateDaysBetweenDates,
  isWeekRange,
} from "../../helpers/calendar";
import { Row, Col, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { appointmentActions } from "../../store/slices/appointmentSlice";
import moment from "moment";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

export const Calendar = () => {
  const [appointments, setAppointments] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const dispatch = useDispatch();
  const [iterator, setIterator] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const monday = moment().day(1).format('YYYYMMDD');

  const appointment = useSelector((state) => state.appointment.appointment);
  const [dateFetch, setDateFetch] = useState(monday);
  const nextWeek = moment(dateFetch).add(7,'days').format('YYYYMMDD');
  const previousWeek = moment(dateFetch).subtract(7,'days').format('YYYYMMDD');

  const modifyHandler = (data) => dispatch(appointmentActions.updateDraft(data));
  
  const groupByDay = groupsByDay(appointments);

  useEffect(() => {
    appointmentService.getAppointments(dateFetch).then((response) => {
      const filteredWeek = filteredAppointments(response.data);
      setAppointments(filteredWeek);
    });
  }, [dateFetch]);

  const handleShowMore = () => setShowMore(!showMore);

  const handleOnClick = (date) => {
    modifyHandler(date);
  };

  const filteredAppointments = (data) =>
    data.filter((day) => true === isWeekRange(day));

  const findDay = (day) => {
    const week = enumerateDaysBetweenDates(parseDate(Date.now()), iterator);
    return week[day];
  };

  const parseDateButton = (date) => parseDate(date.Start).format("HH:mm");

  const renderItems = (group) =>
    groupByDay[group].map((date, index) => {
      return (
        <Button
          type="primary"
          key={`${group} ${index}`}
          onClick={() => handleOnClick(parseDate(date.Start).format("YYYY-MM-DD HH:mm:ss"))}
          disabled={date.Taken || parseDate(date.Start).format("YYYY-MM-DD HH:mm:ss") === appointment }
          className="button-calendar"
        >
          {parseDateButton(date)}
        </Button>
      );
    });

    const handleNext = (date) => {
      appointmentService.getAppointments(date).then((response) => {
        const filteredWeek = filteredAppointments(response.data);
        setAppointments(filteredWeek);
        setIterator(iterator + 1);
        setDateFetch(moment(date).format('YYYYMMDD'));
        setDisabled(false);
      });
    }

    const handlePrevious = (date) => {

      if(iterator - 1  === 0){
        appointmentService.getAppointments(date).then((response) => {
        const filteredWeek = filteredAppointments(response.data);
        setAppointments(filteredWeek);
        setIterator(iterator - 1);
        setDateFetch(moment(date).format('YYYYMMDD'));
        setDisabled(true);
        })
      } else {
      appointmentService.getAppointments(date).then((response) => {
        const filteredWeek = filteredAppointments(response.data);
        setAppointments(filteredWeek);
        setIterator(iterator - 1);
        setDateFetch(moment(date).format('YYYYMMDD'));
        setDisabled(false);
      });
    }
  }

  return (
    <div className="current-appointment">
      {appointments.length > 0 ? (
        <Row>
          <Button disabled={disabled} onClick={() => handlePrevious(previousWeek)}><LeftOutlined /></Button>
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
          <Button onClick={() => handleNext(nextWeek)}><RightOutlined /></Button>
        </Row>
      ) : <div>No dates available</div>}
      { appointments.length > 0 &&
        <div className={!showMore ? "button-more" : "button-less"}>
          <Button onClick={handleShowMore}>
            {showMore ? "Less" : "Show more hours"}
          </Button>
        </div>
      }
    </div>
  );
};
