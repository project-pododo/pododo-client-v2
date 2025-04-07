import React, { useEffect, useState } from "react";
import {
  BackTop,
  message,
  Pagination,
  Button,
  Modal,
  Input,
  DatePicker,
  Spin,
} from "antd";
import NoteCard from "./NoteCard";
import dayjs from "dayjs";
import axios from "axios";

const { RangePicker } = DatePicker;

function NoteList({ onDelete }) {
  const [notes, setNotes] = useState([]);
  const [completedNotes, setCompletedNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [completedCurrentPage, setCompletedCurrentPage] = useState(1);
  const [completedPageSize, setCompletedPageSize] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");

  const defaultStart = dayjs();
  const defaultEnd = dayjs().add(24, "hour");
  const [dateRange, setDateRange] = useState([defaultStart, defaultEnd]);

  useEffect(() => {
    fetchNotes();
    fetchCompletedNotes();
  }, []);

  // todo 조회
  const fetchNotes = async () => {
    try {
      const response = await axios.get("/api/v1/todo");

      if (response.data && response.data.code === "10000") {
        const formattedNotes = response.data.data
          .map((item) => ({
            id: item.todoMstId,
            isCompleted: item.todoStatus === "DONE",
            title: item.todoName,
            content: item.todoDetail,
            dateRange: [dayjs(item.startDate), dayjs(item.endDate)],
          }))
          .sort((a, b) => dayjs(b.dateRange[1]).diff(dayjs(a.dateRange[1])));

        setNotes(formattedNotes);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("할 일 목록을 불러오는 중 오류 발생.");
    }
  };

  // completed 조회
  const fetchCompletedNotes = async () => {
    try {
      const response = await axios.get("/api/v1/todo/completed", {
        params: {
          startDate: "2025-01-01", // 이후 날짜 기준 정립해서 V2에서 수정
          endDate: dayjs().format("YYYY-MM-DD"),
        },
      });

      if (response.data && response.data.code === "10000") {
        const formattedCompletedNotes = response.data.data
          .map((item) => ({
            id: item.todoMstId,
            isCompleted: item.todoStatus === "DONE",
            title: item.todoName,
            content: item.todoDetail,
            dateRange: [dayjs(item.startDate), dayjs(item.endDate)],
          }))
          .sort((a, b) => dayjs(b.dateRange[1]).diff(dayjs(a.dateRange[1])));
        setCompletedNotes(formattedCompletedNotes);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("완료된 목록을 불러오는 중 오류 발생.");
    }
  };

  const [loading, setLoading] = useState(false);

  const resetModal = () => {
    setNewNoteTitle("");
    setNewNoteContent("");
    setDateRange([defaultStart, defaultEnd]);
    setIsModalOpen(false);
  };

  const handleAddNote = async () => {
    if (!newNoteTitle.trim()) {
      message.warning("제목을 입력해주세요.");
      return;
    }
    if (!dateRange.length) {
      message.warning("기간을 선택해주세요.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/v1/todo", {
        todoName: newNoteTitle,
        todoDetail: newNoteContent,
        startDate: dateRange[0].format("YYYY-MM-DD HH:mm"),
        endDate: dateRange[1].format("YYYY-MM-DD HH:mm"),
      });

      if (response.data && response.data.message) {
        message.success(response.data.message);
        resetModal();
        fetchNotes();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("API 호출 중 오류 발생.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const paginatedNotes = notes.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const paginatedCompletedNotes = completedNotes.slice(
    (completedCurrentPage - 1) * completedPageSize,
    completedCurrentPage * completedPageSize
  );

  return (
    <div
      style={{
        padding: 20,
        overflowY: "auto",
        margin: "0 auto",
      }}
    >
      <Button
        type="primary"
        onClick={() => setIsModalOpen(true)}
        style={{
          marginBottom: 20,
          backgroundColor: "#6A0DAD",
          borderColor: "#6A0DAD",
        }}
      >
        할 일 추가
      </Button>
      <h2>할 일</h2>
      {paginatedNotes.length > 0 ? (
        paginatedNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={onDelete}
            fetchNotes={fetchNotes}
            fetchCompletedNotes={fetchCompletedNotes}
          />
        ))
      ) : (
        <div style={{ fontSize: 16, textAlign: "center", width: "100%" }}>
          할 일이 비어 있습니다.
        </div>
      )}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={notes.length}
        onChange={(page, size) => {
          setCurrentPage(page);
          setPageSize(size);
        }}
        showSizeChanger
        onShowSizeChange={(current, size) => setPageSize(size)}
        style={{ textAlign: "center", marginTop: 20 }}
      />

      <h2 style={{ marginTop: 30 }}>완료된 일</h2>
      {paginatedCompletedNotes.length > 0 ? (
        paginatedCompletedNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={onDelete}
            fetchNotes={fetchNotes}
            fetchCompletedNotes={fetchCompletedNotes}
          />
        ))
      ) : (
        <div style={{ fontSize: 16, textAlign: "center", width: "100%" }}>
          완료된 일이 없습니다.
        </div>
      )}
      <Pagination
        current={completedCurrentPage}
        pageSize={completedPageSize}
        total={completedNotes.length}
        onChange={(page, size) => {
          setCompletedCurrentPage(page);
          setCompletedPageSize(size);
        }}
        showSizeChanger
        onShowSizeChange={(current, size) => setCompletedPageSize(size)}
        style={{ textAlign: "center", marginTop: 20 }}
      />
      <BackTop />
      {/* Modal */}
      <Modal
        title="할 일"
        open={isModalOpen}
        onCancel={resetModal}
        footer={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <RangePicker
              showTime={{ format: "HH:mm" }}
              format="YYYY-MM-DD HH:mm"
              value={dateRange}
              onChange={(dates) =>
                setDateRange(dates || [defaultStart, defaultEnd])
              }
              style={{ flex: 1, marginRight: 20, borderColor: "#6A0DAD" }}
            />
            <div>
              <Button
                key="cancel"
                onClick={resetModal}
                style={{ marginRight: 8 }}
              >
                취소
              </Button>
              <Button
                key="submit"
                type="primary"
                onClick={handleAddNote}
                loading={loading}
              >
                추가
              </Button>
            </div>
          </div>
        }
      >
        <Spin spinning={loading} tip="Loading...">
          <Input
            placeholder="제목"
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
            style={{ marginBottom: 10, borderColor: "#6A0DAD" }}
          />
          <Input.TextArea
            placeholder="내용"
            value={newNoteContent}
            onChange={(e) => setNewNoteContent(e.target.value)}
            rows={4}
            style={{ borderColor: "#6A0DAD" }}
          />
        </Spin>
      </Modal>
    </div>
  );
}

export default NoteList;
