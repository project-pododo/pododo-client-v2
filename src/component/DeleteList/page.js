import React, { useState } from "react";
import { List, Input, Button, Tag, Empty, Pagination, Typography } from "antd";
import {
  SearchOutlined,
  UndoOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import styles from "../../css/RubbishList.module.css";

const { Text, Title } = Typography;

const RubbishList = ({ events, onRestore, onPermanentDelete }) => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const rubbishData = events.filter(
    (e) => e.statusID === "deleted" || e.isDeleted,
  );

  const filteredData = rubbishData.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title level={4} className={styles.title}>
          휴지통 <DeleteOutlined />
        </Title>
        <Input
          placeholder="삭제된 일정 검색..."
          prefix={<SearchOutlined className={styles.searchIcon} />}
          className={styles.searchInput}
          allowClear
          onChange={(e) => {
            setSearchText(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className={styles.listWrapper}>
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={paginatedData}
          locale={{
            emptyText: (
              <Empty
                description="휴지통이 비어있습니다."
                className={styles.emptyState}
              />
            ),
          }}
          renderItem={(item) => (
            <List.Item>
              <div className={styles.itemCard}>
                <div>
                  <div className={styles.itemHeader}>
                    <Text strong className={styles.itemTitle}>
                      {item.title}
                    </Text>
                    <Tag color="default" className={styles.dateTag}>
                      {dayjs(item.start).format("YYYY-MM-DD")}
                    </Tag>
                  </div>
                  <Text type="secondary" className={styles.itemDescription}>
                    {item.content || "상세 설명이 없습니다."}
                  </Text>
                </div>

                <div className={styles.buttonGroup}>
                  <Button
                    icon={<UndoOutlined />}
                    onClick={() => onRestore(item.id)}
                    className={styles.actionButton}
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

      <div className={styles.paginationWrapper}>
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
