import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import styles from "../../css/CalendarPage.module.css";
import "../../css/pulse-theme.css";

import { eventColorMap } from "../../TestData/TestData";
import { useCalendar } from "../../context/CalendarContext";

const CalendarPage = ({ events, onDelete, onSelectEvent, onEventDrop }) => {
  const { openFormWithDate } = useCalendar();
  const [isReady, setIsReady] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
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
          initialView={isMobile ? "listWeek" : "dayGridMonth"}
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
          height={isMobile ? "auto" : "100%"}
          dayMaxEventRows={isMobile ? 2 : true}
          headerToolbar={
            isMobile
              ? {
                  left: "prev,next",
                  center: "title",
                  right: "listWeek,dayGridMonth",
                }
              : {
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                }
          }
          longPressDelay={100}
          handleWindowResize={true}
        />
      )}
    </div>
  );
};

export default CalendarPage;
