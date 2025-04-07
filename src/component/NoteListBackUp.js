import React, { useState, useEffect } from "react";
import { Input, Button, Card, DatePicker, message, Spin } from "antd";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import NoteCard from "./NoteCard";

dayjs.extend(weekday);
dayjs.extend(localeData);

const { TextArea } = Input;
const { RangePicker } = DatePicker;

function NoteList() {
  const defaultStart = dayjs();
  const defaultEnd = dayjs().add(24, "hour");

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [dateRange, setDateRange] = useState([defaultStart, defaultEnd]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleAdd = () => {
    if (!title.trim()) {
      message.warning("제목을 입력해주세요.");
      return;
    }

    if (!content.trim()) {
      message.warning("내용을 입력해주세요.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const newNote = {
        id: Date.now(),
        title,
        content,
        dateRange: dateRange || [defaultStart, defaultEnd],
        isCompleted: false,
      };

      setNotes([...notes, newNote]);
      message.success("일정이 추가되었습니다.");
      setTitle("");
      setContent("");
      setDateRange([defaultStart, defaultEnd]);
      setLoading(false);
    }, 1500); //임시로 로딩시간 1.5초 세팅. api 적용 후 제거.
  };

  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleUpdate = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, isCompleted: !note.isCompleted } : note
      )
    );
  };

  const pendingNotes = notes.filter((note) => !note.isCompleted);
  const completedNotes = notes.filter((note) => note.isCompleted);

  return (
    <div style={{ margin: "0 auto" }}>
      <Card
        style={{
          marginBottom: 16,
          borderColor: "#6A0DAD",
          backgroundColor: "#F3E5F5",
        }}
      >
        <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
          <Input
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ flex: 1, borderColor: "#6A0DAD" }}
          />
          <RangePicker
            showTime
            value={dateRange}
            onChange={(dates) =>
              setDateRange(dates || [defaultStart, defaultEnd])
            }
            style={{ width: "300px", borderColor: "#6A0DAD" }}
          />
        </div>
        <TextArea
          placeholder="노트 내용을 입력하세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          autoSize={{ minRows: 2, maxRows: 6 }}
        />
        <div style={{ marginTop: 8, textAlign: "center" }}>
          <Spin spinning={loading} tip="Loading...">
            <Button
              type="primary"
              onClick={handleAdd}
              style={{
                width: "100%",
                backgroundColor: "#6A0DAD",
                borderColor: "#6A0DAD",
              }}
              loading={loading}
            >
              추가하기
            </Button>
          </Spin>
        </div>
      </Card>
      <h2>할 일</h2>
      {pendingNotes.length > 0 ? (
        pendingNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))
      ) : (
        <div style={{ fontSize: 16, textAlign: "center", width: "100%" }}>
          할 일이 비어 있습니다.
        </div>
      )}
      <h2 style={{ marginTop: 30 }}>완료된 일</h2>
      {completedNotes.length > 0 ? (
        completedNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))
      ) : (
        <div style={{ fontSize: 16, textAlign: "center", width: "100%" }}>
          완료된 일이 없습니다.
        </div>
      )}
    </div>
  );
}

export default NoteList;
