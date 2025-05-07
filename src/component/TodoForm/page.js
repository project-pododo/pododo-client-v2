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
    <div style={{ padding: 16 }}>
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
        <Form.Item name="title" label="제목" rules={[{ required: true }]}>
          <Input placeholder="제목을 입력하세요" />
        </Form.Item>

        <Form.Item>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span>종일</span>
            <Switch
              checked={isToggleOn}
              onChange={(checked) => setIsToggleOn(checked)}
            />
          </div>
        </Form.Item>

        <Form.Item name="dateRange" label="날짜 선택">
          <RangePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="content" label="내용">
          <Input.TextArea rows={4} placeholder="내용을 입력하세요" />
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
