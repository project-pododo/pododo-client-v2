import React, { useState } from "react";
import { Input, Button, Card, DatePicker, message, Spin } from "antd";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import axios from "axios";

dayjs.extend(weekday);
dayjs.extend(localeData);

const { TextArea } = Input;
const { RangePicker } = DatePicker;

function NoteForm({ onAdd }) {
  const defaultStart = dayjs();
  const defaultEnd = dayjs().add(24, "hour");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [dateRange, setDateRange] = useState([defaultStart, defaultEnd]);
  const [loading, setLoading] = useState(false);

  // API 호출 함수
  const handleApiCall = async () => {
    if (!title.trim() || !content.trim() || !dateRange) {
      message.warning("필수 입력값을 입력해주세요.");
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post("/api/v1/todo", {
        todoName: title,
        todoDetail: content,
        startDate: dateRange[0].format("YYYY-MM-DD HH:mm"),
        endDate: dateRange[1].format("YYYY-MM-DD HH:mm"),
      });

      if (response.data && response.data.message) {
        message.success(response.data.message);
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

  return (
    <Card
      style={{
        marginBottom: 16,
        borderColor: "#6A0DAD",
        backgroundColor: "#F3E5F5",
        borderRadius: "12px",
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
          showTime={{ format: "HH:mm" }}
          format="YYYY-MM-DD HH:mm"
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
      <div style={{ marginTop: 8, width: "100%", textAlign: "center" }}>
        <Spin spinning={loading} tip="Loading...">
          <Button
            type="primary"
            onClick={handleApiCall}
            style={{
              marginTop: 8,
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
  );
}

export default NoteForm;
