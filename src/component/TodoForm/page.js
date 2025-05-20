// src/component/SideInputForm.jsx
import React, { useState } from "react";
import { Input, Button, Form, Dropdown, Menu, DatePicker, Switch } from "antd";
import { MoreOutlined } from "@ant-design/icons";
// import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const FormPage = ({ onSubmit, onDelete }) => {
  const [form] = Form.useForm();
  const [isToggleOn, setIsToggleOn] = useState(false);

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

      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item name="title" rules={[{ required: true }]}>
          <Input placeholder="제목" />
        </Form.Item>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            width: "100%",
            marginBottom: 24
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

        <Form.Item name="content">
          <Input.TextArea rows={4} placeholder="내용" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            저장
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormPage;
