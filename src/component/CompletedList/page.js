import React, { useState } from "react";
import {
  List,
  Input,
  Button,
  Tag,
  Empty,
  Pagination,
  Typography,
  Checkbox,
} from "antd";
import {
  SearchOutlined,
  CheckCircleOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Text } = Typography;

const DoneList = ({ events, onToggleStatus }) => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const doneData = events.filter((e) => e.statusID === "done");

  const filteredData = doneData.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <div
      style={{
        padding: "10px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography.Title level={4} style={{ margin: 0, color: "#52c41a" }}>
          완료된 일정 <CheckCircleOutlined />
        </Typography.Title>
        <Input
          placeholder="완료된 일정 검색..."
          prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
          style={{ width: 250, borderRadius: "8px" }}
          allowClear
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div style={{ flex: 1 }}>
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={paginatedData}
          locale={{
            emptyText: (
              <Empty
                description="완료된 일정이 없습니다."
                style={{ marginTop: 100 }}
              />
            ),
          }}
          renderItem={(item) => (
            <List.Item>
              <div
                style={{
                  padding: "16px",
                  backgroundColor: "#f6ffed",
                  border: "1px solid #b7eb8f",
                  borderRadius: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ marginBottom: 4 }}>
                    <Checkbox
                      checked={true}
                      onChange={() => onToggleStatus(item.id)}
                      style={{ marginRight: 10 }}
                    />
                    <Text
                      delete
                      strong
                      style={{ fontSize: "16px", color: "#555" }}
                    >
                      {item.title}
                    </Text>
                    <Tag
                      color="green"
                      style={{ marginLeft: 8, borderRadius: "4px" }}
                    >
                      {dayjs(item.start).format("YYYY-MM-DD")}
                    </Tag>
                  </div>
                  <Text
                    type="secondary"
                    style={{ fontSize: "13px", marginLeft: 28 }}
                  >
                    {item.content || "상세 설명이 없습니다."}
                  </Text>
                </div>

                <Button
                  icon={<RollbackOutlined />}
                  onClick={() => onToggleStatus(item.id)}
                  style={{ borderRadius: "6px" }}
                >
                  되돌리기
                </Button>
              </div>
            </List.Item>
          )}
        />
      </div>

      <div style={{ textAlign: "center", marginTop: 16 }}>
        <Pagination
          current={currentPage}
          total={filteredData.length}
          pageSize={pageSize}
          onChange={(page) => setCurrentPage(page)}
          simple
        />
      </div>
    </div>
  );
};

export default DoneList;
