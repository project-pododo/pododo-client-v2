import React, { useState } from "react";
import {
  Collapse,
  Button,
  Input,
  Switch,
  Dropdown,
  message,
  DatePicker,
} from "antd";
import { MoreOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import axios from "axios";
import "../css/CustomStyle.css";

const { Panel } = Collapse;
const { RangePicker } = DatePicker;

function NoteCard({ note, fetchNotes, fetchCompletedNotes }) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [dateRange, setDateRange] = useState(note.dateRange);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  const isOverdue = note.dateRange && dayjs().isAfter(dayjs(note.dateRange[1]));

  const saveTitle = () => {
    setIsEditingTitle(false);
    handleUpdate({ title });
  };

  const saveContent = () => {
    setIsEditingContent(false);
    handleUpdate({ content });
  };

  const handleDateChange = (dates) => {
    if (!dates) return;
    setDateRange(dates);
    handleUpdate({ dateRange: dates });
  };

  const handleToggleStatus = async (id) => {
    try {
      const response = await axios.patch("/api/v1/todo/status", {
        todoMstId: id,
      });
      if (response.status === 200 && response.data.code === "10002") {
        message.success(response.data.message);
        fetchNotes();
        fetchCompletedNotes();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("상태 변경 중 오류가 발생했습니다.");
    }
  };

  const handleUpdate = async (updatedFields) => {
    try {
      const updatedNote = {
        ...note,
        ...updatedFields,
      };

      const response = await axios.put("/api/v1/todo", {
        todoMstId: updatedNote.id,
        todoName: updatedNote.title,
        todoDetail: updatedNote.content,
        startDate: updatedNote.dateRange[0]?.format("YYYY-MM-DD HH:mm"),
        endDate: updatedNote.dateRange[1]?.format("YYYY-MM-DD HH:mm"),
      });

      if (response.data.code === "10002") {
        message.success(response.data.message);
        fetchNotes();
        fetchCompletedNotes();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("업데이트 중 오류 발생.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete("/api/v1/todo", {
        data: { todoMstId: id },
      });
      if (response.status === 200 && response.data.code === "10003") {
        message.success(response.data.message);
        fetchNotes();
        fetchCompletedNotes();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("삭제 중 오류가 발생했습니다.");
    }
  };

  const deleteMenuItems = [
    {
      key: "delete",
      label: "삭제",
      danger: true,
      onClick: () => handleDelete(note.id),
    },
  ];

  return (
    <Collapse
      accordion={false}
      style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        overflow: "hidden",
        marginBottom: "4px",
      }}
    >
      <Panel
        header={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <Switch
                checkedChildren="완료"
                unCheckedChildren="미완료"
                checked={note.isCompleted}
                onChange={() => handleToggleStatus(note.id)}
                size="large"
                className="ant-switch02"
                style={{
                  background: note.isCompleted ? "" : "#9B59B6",
                }}
              />
              {isEditingTitle ? (
                <Input
                  value={title}
                  onChange={handleTitleChange}
                  onBlur={saveTitle}
                  autoFocus
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditingTitle(true);
                  }}
                  style={{
                    textDecoration: note.isCompleted ? "line-through" : "none",
                    color: note.isCompleted
                      ? "#9B59B6"
                      : isOverdue
                      ? "red"
                      : "#9B59B6",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  {title}
                </div>
              )}
            </div>
            {note.dateRange &&
              (note.isCompleted ? (
                <p
                  style={{
                    color: "#9B59B6",
                    fontSize: "16px",
                    marginTop: "8px",
                    marginBottom: "8px",
                    marginRight: "10px",
                    minWidth: "258px",
                  }}
                >
                  {dayjs(note.dateRange[0]).format("YYYY-MM-DD HH:mm")} ~{" "}
                  {dayjs(note.dateRange[1]).format("YYYY-MM-DD HH:mm")}
                </p>
              ) : (
                <RangePicker
                  value={dateRange}
                  onChange={handleDateChange}
                  showTime
                  disabled={note.isCompleted}
                  onClick={(e) => e.stopPropagation()}
                  style={{ marginRight: "10px" }}
                />
              ))}
          </div>
        }
        key={note.id}
        extra={
          <Dropdown
            menu={{ items: deleteMenuItems }}
            trigger={["click"]}
            placement="bottomLeft"
            arrow
          >
            <Button
              type="text"
              icon={<MoreOutlined />}
              onClick={(e) => e.stopPropagation()}
            />
          </Dropdown>
        }
      >
        <div
          className="ant-collapse-content"
          style={{
            backgroundColor: "#F4E6F1",
          }}
        >
          {isEditingContent ? (
            <Input.TextArea
              value={content}
              onChange={handleContentChange}
              onBlur={saveContent}
              autoSize={{ minRows: 2, maxRows: 6 }}
              autoFocus
            />
          ) : (
            <p
              style={{ whiteSpace: "pre-line", cursor: "pointer" }}
              onClick={() => setIsEditingContent(true)}
            >
              {content}
            </p>
          )}
        </div>
      </Panel>
    </Collapse>
  );
}

export default NoteCard;
