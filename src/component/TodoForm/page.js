import React, { useState, useEffect, useCallback, useRef } from "react";
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
import dayjs from "dayjs";
import { useCalendar } from "../../context/CalendarContext";
import styles from "../../css/TodoForm.module.css";

const { RangePicker } = DatePicker;

const FormPage = ({ initialData, onSubmit, onDelete }) => {
  const [form] = Form.useForm();
  const [isToggleOn, setIsToggleOn] = useState(false);
  const { selectedDate } = useCalendar();

  const formRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      const startDate = initialData.start || initialData.date;
      const endDate = initialData.end || initialData.date;

      form.setFieldsValue({
        ...initialData,
        dateRange:
          startDate && endDate
            ? [dayjs(startDate), dayjs(endDate)]
            : [null, null],
      });
      setIsToggleOn(initialData.statusID === "done");
    } else {
      form.resetFields();
      if (selectedDate) {
        form.setFieldsValue({
          dateRange: [dayjs(selectedDate), dayjs(selectedDate)],
          type: "Atype",
        });
      }
      setIsToggleOn(false);
    }
  }, [initialData, selectedDate, form]);

  const handleProcessSave = useCallback(() => {
    const values = form.getFieldsValue();

    if (!values.title || values.title.trim() === "") return;

    const formattedValues = {
      ...values,
      id: initialData?.id,
      dateRange: values.dateRange
        ? values.dateRange.map((d) => d.format("YYYY-MM-DD"))
        : [],
      toggleStatus: isToggleOn,
    };

    onSubmit(formattedValues);

    if (!initialData) {
      form.resetFields();
      setIsToggleOn(false);
      if (selectedDate) {
        form.setFieldsValue({
          dateRange: [dayjs(selectedDate), dayjs(selectedDate)],
          type: "Atype",
        });
      }
    }
  }, [form, initialData, isToggleOn, onSubmit, selectedDate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickInsideForm =
        formRef.current && formRef.current.contains(event.target);
      const isClickInsidePopup =
        event.target.closest(".ant-picker-dropdown") ||
        event.target.closest(".ant-picker-dropdown") ||
        event.target.closest(".ant-dropdown") ||
        event.target.closest(".ant-select-item");

      if (!isClickInsideForm && !isClickInsidePopup) {
        handleProcessSave();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleProcessSave]);

  const handleDelete = () => {
    if (initialData?.id && window.confirm("이 일정을 삭제할까요?")) {
      onDelete(initialData.id);
      form.resetFields();
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" danger onClick={handleDelete}>
        삭제
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.formContainer} ref={formRef}>
      <div className={styles.header}>
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button
            icon={<MoreOutlined />}
            type="text"
            className={styles.moreButton}
          />
        </Dropdown>
      </div>

      <Form layout="vertical" form={form} initialValues={{ type: "Atype" }}>
        <Form.Item name="title" rules={[{ required: true }]}>
          <Input placeholder="제목" />
        </Form.Item>

        <div className={styles.dateRangeWrapper}>
          <img
            src="/images/Clock.svg"
            alt="날짜"
            className={styles.clockIcon}
          />
          <Form.Item name="dateRange" noStyle>
            <RangePicker
              className={styles.rangePicker}
              getPopupContainer={(trigger) => trigger.parentElement}
            />
          </Form.Item>
        </div>

        <Form.Item label="완료여부">
          <Switch
            checked={isToggleOn}
            onChange={(checked) => {
              setIsToggleOn(checked);
            }}
          />
        </Form.Item>

        <Form.Item name="repeat" label="반복">
          <Select placeholder="반복 없음">
            <Select.Option value="none">반복 없음</Select.Option>
            <Select.Option value="daily">매일</Select.Option>
            <Select.Option value="weekly">매주</Select.Option>
            <Select.Option value="monthly">매월</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="content">
          <Input.TextArea rows={4} placeholder="내용을 입력하세요" />
        </Form.Item>

        <Form.Item name="type" label="타입">
          <Select>
            <Select.Option value="Atype">A타입</Select.Option>
            <Select.Option value="Btype">B타입</Select.Option>
            <Select.Option value="Ctype">C타입</Select.Option>
            <Select.Option value="Dtype">D타입</Select.Option>
            <Select.Option value="Etype">E타입</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" block className={styles.focusButton}>
            집중모드
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormPage;
