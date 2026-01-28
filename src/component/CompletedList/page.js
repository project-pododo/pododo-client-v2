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
import styles from "../../css/CompletedList.module.css";

const { Text, Title } = Typography;

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
    <div className={styles.container}>
      <div className={styles.header}>
        <Title level={4} className={styles.title}>
          완료된 일정 <CheckCircleOutlined />
        </Title>
        <Input
          placeholder="완료된 일정 검색..."
          prefix={<SearchOutlined className={styles.searchIcon} />}
          className={styles.searchInput}
          allowClear
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className={styles.listWrapper}>
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={paginatedData}
          locale={{
            emptyText: (
              <Empty
                description="완료된 일정이 없습니다."
                className={styles.emptyState}
              />
            ),
          }}
          renderItem={(item) => (
            <List.Item>
              <div className={styles.itemCard}>
                <div className={styles.itemInfo}>
                  <div className={styles.itemHeader}>
                    <Checkbox
                      checked={true}
                      onChange={() => onToggleStatus(item.id)}
                      className={styles.checkbox}
                    />
                    <Text delete strong className={styles.itemTitle}>
                      {item.title}
                    </Text>
                    <Tag color="green" className={styles.dateTag}>
                      {dayjs(item.start).format("YYYY-MM-DD")}
                    </Tag>
                  </div>
                  <Text type="secondary" className={styles.itemDescription}>
                    {item.content || "상세 설명이 없습니다."}
                  </Text>
                </div>

                <Button
                  icon={<RollbackOutlined />}
                  onClick={() => onToggleStatus(item.id)}
                  className={styles.rollbackButton}
                >
                  되돌리기
                </Button>
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

export default DoneList;
