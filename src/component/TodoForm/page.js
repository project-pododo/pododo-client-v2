// src/component/SideInputForm.jsx
import React, { useState } from "react";
import {
  Input,
  Button,
  Form,
  Dropdown,
  Menu,
  DatePicker,
  Switch,
  Select,
} from "antd";
import { MoreOutlined } from "@ant-design/icons";
// import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const FormPage = ({ onSubmit, onDelete }) => {
  const [form] = Form.useForm();
  const [isToggleOn, setIsToggleOn] = useState(true);
  const [selectedType, setSelectedType] = useState("Atype");

  const typeColorMap = {
    Atype: "#FF6B6B", // 빨강
    Btype: "#4ECDC4", // 민트
    Ctype: "#FFD93D", // 노랑
    Dtype: "#1A535C", // 딥 블루
    Etype: "#ba68c8", // 기본 보라
  };

  const handleFinish = (values) => {
    const formattedValues = {
      ...values,
      dateRange: values.dateRange
        ? values.dateRange.map((d) => d.format("YYYY-MM-DD"))
        : [],
      toggleStatus: isToggleOn,
    };
    onSubmit(formattedValues);
    form.resetFields();
    setIsToggleOn(false);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" danger onClick={onDelete}>
        삭제
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      style={{ padding: 16, backgroundColor: "#F0DAFF", minHeight: "100vh" }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button
            icon={<MoreOutlined />}
            type="text"
            style={{ float: "right", fontSize: "18px" }}
          />
        </Dropdown>
      </div>

      <Form layout="vertical" form={form} onFinish={handleFinish} initialValues={{ type: "Atype" }}>
        <Form.Item name="title" rules={[{ required: true }]}>
          <Input placeholder="제목" />
        </Form.Item>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            width: "100%",
            marginBottom: 24,
          }}
        >
          <img
            src="/images/Clock.svg"
            alt="날짜"
            style={{ width: 20, height: 20 }}
          />
          <RangePicker style={{ flex: 1, minWidth: 0 }} />
        </div>

        <Form.Item>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span>종일</span>
            <Switch
              checked={isToggleOn}
              onChange={(checked) => setIsToggleOn(checked)}
            />
          </div>
        </Form.Item>

        <Form.Item name="repeat" label="반복">
          <Select placeholder="반복">
            <Select.Option value="none">반복 없음</Select.Option>
            <Select.Option value="daily">매일</Select.Option>
            <Select.Option value="weekly">매주</Select.Option>
            <Select.Option value="monthly">매월</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="content">
          <Input.TextArea rows={4} placeholder="내용" />
        </Form.Item>

        <Form.Item
          name="type"
          label={
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {selectedType && (
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 4,
                    backgroundColor: typeColorMap[selectedType],
                    border: "1px solid #ccc",
                  }}
                />
              )}
              <span>타입</span>
            </div>
          }
        >
          <Select
            placeholder="타입"
            onChange={(value) => setSelectedType(value)}
            allowClear
          >
            <Select.Option value="Atype">A타입</Select.Option>
            <Select.Option value="Btype">B타입</Select.Option>
            <Select.Option value="Ctype">C타입</Select.Option>
            <Select.Option value="Dtype">D타입</Select.Option>
            <Select.Option value="Etype">E타입</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="button"
            block
            style={{ borderRadius: "20px" }}
          >
            집중모드
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormPage;
