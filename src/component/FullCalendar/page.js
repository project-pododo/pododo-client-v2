import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import styles from "../..//css/CalendarPage.module.css";
import "../../css/pulse-theme.css";

import { eventColorMap } from "../../TestData/TestData";
import { useCalendar } from "../../context/CalendarContext";

const CalendarPage = ({ events, onDelete, onSelectEvent, onEventDrop }) => {
  const { openFormWithDate } = useCalendar();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const coloredEvents = events.map((event) => ({
    ...event,
    color: eventColorMap[event.type] || "#ba68c8",
  }));

  const handleDateClick = (info) => {
    if (onSelectEvent) onSelectEvent(null);
    openFormWithDate(info.dateStr);
  };

  return (
    <div className={styles.calendarContainer}>
      {isReady && (
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          events={coloredEvents}
          dateClick={handleDateClick}
          eventClick={(info) => {
            onSelectEvent(info.event);
          }}
          eventContextMenu={(info) => {
            info.jsEvent.preventDefault();
            if (window.confirm("이 일정을 삭제할까요?")) {
              onDelete(info.event.id);
            }
          }}
          eventStartEditable={true}
          eventDrop={onEventDrop}
          height="100%"
          dayMaxEventRows={true}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
        />
      )}
    </div>
  );
};

export default CalendarPage;
