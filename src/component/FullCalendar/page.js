import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../../css/pulse-theme.css";
import listPlugin from "@fullcalendar/list";
import { initialCalendarEvents, eventColorMap } from "../.././TestData/TestData";

const CalendarPage = ({onDateClick}) => {
  const [events, setEvents] = useState(initialCalendarEvents);

  const ColoreEvents = events.map((event) => ({
    ...event,
    color: eventColorMap[event.type] || "#ba68c8",
  }));

  // 날짜 클릭 → 새 투두 추가
  const handleDateClick = (info) => {
    window.dispatchEvent(new CustomEvent("toggleSidebar", { detail: { open: true } }));
    window.dispatchEvent(new CustomEvent("resetTodoForm", { detail: { date: info.dateStr } }));
  };
  
  // 이벤트 클릭 → 삭제
  const handleEventClick = (info) => {
    const shouldDelete = window.confirm("이 일정을 삭제할까요?");
    if (shouldDelete) {
      const updatedEvents = events.filter((e) => String(e.id)!== info.event.id);
      setEvents(updatedEvents);
    }
  };

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", padding: "0" }}>
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
          events={ColoreEvents}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
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
