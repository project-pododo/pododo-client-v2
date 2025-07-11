import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../../css/pulse-theme.css";
import listPlugin from "@fullcalendar/list";

const CalendarPage = () => {
  const [events, setEvents] = useState([
    { id: "1", title: "회의", date: "2025-07-15", type: "Etype" },
    { id: "2", title: "업무 마감", date: "2025-07-18", type: "Atype" },
    { id: "3", title: "운동", date: "2025-07-23", type: "Btype" },
    { id: "4", title: "외부 미팅", date: "2025-07-28", type: "Dtype" },
    { id: "5", title: "생일", date: "2025-07-23", type: "Ctype" },
  ]);

  const typeColorMap = {
    Atype: "#FF6B6B", // 빨강
    Btype: "#4ECDC4", // 민트
    Ctype: "#FFD93D", // 노랑
    Dtype: "#1A535C", // 딥 블루
    Etype: "#ba68c8", // 기본 보라
  };

  const ColoreEvents = events.map((event) => ({
    ...event,
    color: typeColorMap[event.type] || "#ba68c8",
  }));

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
            // listWeek, listMonth, listDay 형식으로 세팅 가능
          }}
        />
      )}
    </div>
  );
};

export default CalendarPage;
