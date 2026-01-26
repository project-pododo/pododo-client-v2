import React, { useState } from "react";
import { List, Input, Button, Tag, Empty, Pagination, Typography } from "antd";
import { SearchOutlined, UndoOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Text } = Typography;

const RubbishList = ({ events, onRestore, onPermanentDelete }) => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // 1. 휴지통 데이터 필터링 (statusID가 'deleted'인 것들)
  const rubbishData = events.filter((e) => e.statusID === "deleted" || e.isDeleted);

  // 2. 검색 필터링
  const filteredData = rubbishData.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  // 3. 페이지네이션 계산
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div style={{ padding: "10px", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography.Title level={4} style={{ margin: 0, color: "#722ed1" }}>
          휴지통 <DeleteOutlined />
        </Typography.Title>
        <Input
          placeholder="삭제된 일정 검색..."
          prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
          style={{ width: 250, borderRadius: "8px" }}
          allowClear
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={paginatedData}
          locale={{ emptyText: <Empty description="휴지통이 비어있습니다." style={{ marginTop: 100 }} /> }}
          renderItem={(item) => (
            <List.Item>
              <div style={{
                padding: "16px",
                backgroundColor: "#fdfdfd",
                border: "1px solid #f0f0f0",
                borderRadius: "12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "all 0.3s"
              }} className="list-item-hover">
                <div>
                  <div style={{ marginBottom: 4 }}>
                    <Text strong style={{ fontSize: "16px" }}>{item.title}</Text>
                    <Tag color="default" style={{ marginLeft: 8, borderRadius: "4px" }}>
                      {dayjs(item.start).format("YYYY-MM-DD")}
                    </Tag>
                  </div>
                  <Text type="secondary" style={{ fontSize: "13px" }}>
                    {item.content || "상세 설명이 없습니다."}
                  </Text>
                </div>
                
                <div style={{ display: "flex", gap: "8px" }}>
                  <Button 
                    icon={<UndoOutlined />} 
                    onClick={() => onRestore(item.id)}
                    style={{ borderRadius: "6px" }}
                  >
                    복원
                  </Button>
                  <Button 
                    danger 
                    type="text"
                    icon={<DeleteOutlined />} 
                    onClick={() => onPermanentDelete(item.id)}
                  >
                    영구 삭제
                  </Button>
                </div>
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

export default RubbishList;