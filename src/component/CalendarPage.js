import React, { useEffect, useState } from "react";
import { Badge, Calendar, message } from "antd";
import dayjs from "dayjs";
import axios from "axios";
import "../css/CustomStyle.css";

function CalendarPage() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get("/api/v1/todo");

      if (response.data && response.data.code === "10000") {
        const formattedNotes = response.data.data.map((item) => {
          const endDate = dayjs(item.endDate).format("YYYY-MM-DD");
          return {
            id: item.todoMstId,
            title: item.todoName,
            content: item.todoDetail,
            endDate,
            type: dayjs().isAfter(dayjs(endDate)) ? "error" : "success",
          };
        });

        setNotes(formattedNotes);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("할 일 목록을 불러오는 중 오류 발생.");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const getListData = (value) => {
    const dateKey = value.format("YYYY-MM-DD");
    return notes.filter((note) => note.endDate === dateKey);
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.id}>
            <Badge status={item.type} text={item.title} />
          </li>
        ))}
      </ul>
    );
  };

  return <Calendar dateCellRender={dateCellRender} />;
}

export default CalendarPage;
