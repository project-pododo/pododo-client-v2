import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
// import "../../css/pulse-theme.css";
import listPlugin from "@fullcalendar/list";

const CalendarPage = () => {
  const [events, setEvents] = useState([
    { id: "1", title: "회의", date: "2025-04-15" },
    { id: "2", title: "업무 마감", date: "2025-04-18" },
  ]);

  // 날짜 클릭 → 새 투두 추가
  const handleDateClick = (info) => {
    const title = prompt("할 일 제목을 입력하세요:");
    if (title) {
      const newEvent = {
        id: String(events.length + 1),
        title,
        date: info.dateStr,
      };
      setEvents([...events, newEvent]);
    }
  };

  // 이벤트 클릭 → 삭제
  const handleEventClick = (info) => {
    const shouldDelete = window.confirm("이 일정을 삭제할까요?");
    if (shouldDelete) {
      const updatedEvents = events.filter((e) => e.id !== info.event.id);
      setEvents(updatedEvents);
    }
  };

  return (
    <div style={{ width: "100%", height: "100%", padding: "0" }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        height="100%"
        dayMaxEventRows={true}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          // listWeek, listMonth, listDay 형식으로 세팅 가능
        }}
      />
    </div>
  );
};

export default CalendarPage;
