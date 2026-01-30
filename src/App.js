import React, { useState, useEffect } from "react";
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import {
  Layout,
  Menu,
  List,
  Switch,
  Typography,
  ConfigProvider,
  Drawer,
} from "antd";
import {
  UserOutlined,
  UnorderedListOutlined,
  DeleteOutlined,
  CalendarOutlined,
  VerticalLeftOutlined,
  VerticalRightOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import locale from "antd/es/date-picker/locale/ko_KR";

import "./css/GlobalTheme.css";
import styles from "./css/App.module.css";

import FullCalendar from "./component/FullCalendar/page";
import TodoForm from "./component/TodoForm/page";
import LoginPage from "./component/LoginForm/page";
import DeleteList from "./component/DeleteList/page";
import CompletedList from "./component/CompletedList/page";

import { ResponsivePie } from "@nivo/pie";
import { ResponsiveWaffle } from "@nivo/waffle";
import { initialCalendarEvents } from "./TestData/TestData";

import { useCalendar } from "./context/CalendarContext";
import { useCalendarData } from "./hooks/useCalendarData";

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.locale("ko");

const { Sider, Content } = Layout;
const { Text } = Typography;

const App = () => {
  const [events, setEvents] = useState(initialCalendarEvents);
  const [selectedKey, setSelectedKey] = useState("2");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const location = useLocation();

  const { isSideVisible, setIsSideVisible } = useCalendar();
  const { dailyList, donutData, waffleData } = useCalendarData(events);

  const handleDeleteEvent = (id) =>
    setEvents((prev) => prev.filter((event) => event.id !== String(id)));
  const handleToggleStatus = (id) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id
          ? {
              ...event,
              statusID: event.statusID === "done" ? "incomplete" : "done",
            }
          : event,
      ),
    );
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) setIsSideVisible(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsSideVisible]);

  useEffect(() => {
    const pathMap = {
      "/": "2",
      "/user": "1",
      "/completed": "3",
      "/rubbish": "4",
    };
    setSelectedKey(pathMap[location.pathname] || "2");
  }, [location.pathname]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSaveEvent = (formData) => {
    if (!formData.title) return;
    setEvents((prev) => {
      const isExisting =
        formData.id && prev.some((e) => String(e.id) === String(formData.id));
      if (isExisting) {
        return prev.map((e) =>
          String(e.id) === String(formData.id)
            ? {
                ...e,
                ...formData,
                start: formData.dateRange?.[0],
                end: formData.dateRange?.[1],
                statusID: formData.toggleStatus ? "done" : "incomplete",
              }
            : e,
        );
      } else {
        return [
          ...prev,
          {
            ...formData,
            id: String(Date.now()),
            start: formData.dateRange?.[0],
            end: formData.dateRange?.[1],
            statusID: "created",
          },
        ];
      }
    });
  };

  const handleSelectEvent = (eventData) => {
    if (!eventData) {
      setSelectedEvent(null);
      return;
    }
    const target = events.find((e) => e.id === String(eventData.id));
    if (target) {
      setSelectedEvent(target);
      if (isMobile) {
        setIsDrawerOpen(true);
      }
    }
  };

  const handleEventDrop = (info) => {
    const { event } = info;
    const updatedEvent = {
      id: event.id,
      title: event.title,
      start: dayjs(event.start).format("YYYY-MM-DD"),
      end: event.end
        ? dayjs(event.end).format("YYYY-MM-DD")
        : dayjs(event.start).format("YYYY-MM-DD"),
      dateRange: [
        dayjs(event.start).format("YYYY-MM-DD"),
        event.end
          ? dayjs(event.end).format("YYYY-MM-DD")
          : dayjs(event.start).format("YYYY-MM-DD"),
      ],
      ...event.extendedProps,
    };
    setEvents((prev) =>
      prev.map((e) =>
        String(e.id) === String(updatedEvent.id)
          ? { ...e, ...updatedEvent }
          : e,
      ),
    );
  };

  const handleMoveToTrash = (id) =>
    setEvents((prev) =>
      prev.map((event) =>
        event.id === String(id) ? { ...event, statusID: "deleted" } : event,
      ),
    );
  const handleRestore = (id) =>
    setEvents((prev) =>
      prev.map((event) =>
        event.id === String(id) ? { ...event, statusID: "incomplete" } : event,
      ),
    );
  const handlePermanentDelete = (id) =>
    setEvents((prev) => prev.filter((event) => event.id !== String(id)));

  return (
    <ConfigProvider locale={locale}>
      <Layout className={styles.mainLayout}>
        <Layout className={styles.horizontalLayout}>
          <Sider
            collapsed={true}
            collapsedWidth={isMobile ? 0 : 80}
            width={80}
            className={styles.sider}
          >
            <div className={styles.siderWrapper}>
              <Menu
                mode="inline"
                selectedKeys={[selectedKey]}
                inlineCollapsed={true}
                className={styles.transparentMenu}
                onSelect={({ key }) => {
                  const routes = {
                    1: "/user",
                    2: "/",
                    3: "/completed",
                    4: "/rubbish",
                  };
                  if (routes[key]) navigate(routes[key]);
                }}
              >
                <Menu.Item key="0" className={styles.logoText}>
                  <Link to="/">PODODO</Link>
                </Menu.Item>
                <Menu.Item
                  key="1"
                  icon={<UserOutlined />}
                  className={selectedKey === "1" ? "active-menu" : ""}
                >
                  USER
                </Menu.Item>
                <Menu.Item
                  key="2"
                  icon={<CalendarOutlined />}
                  className={selectedKey === "2" ? "active-menu" : ""}
                >
                  CALENDAR
                </Menu.Item>
                <Menu.Item
                  key="3"
                  icon={<UnorderedListOutlined />}
                  className={selectedKey === "3" ? "active-menu" : ""}
                >
                  DONE
                </Menu.Item>
                <Menu.Item
                  key="4"
                  icon={<DeleteOutlined />}
                  className={selectedKey === "4" ? "active-menu" : ""}
                >
                  TRASH
                </Menu.Item>
              </Menu>
              <Menu mode="inline" className={styles.transparentMenu}>
                <Menu.Item
                  key="5"
                  icon={
                    <img
                      src="/images/icon-grapes.png"
                      alt="logo"
                      style={{ width: "24px" }}
                    />
                  }
                >
                  LOGO
                </Menu.Item>
              </Menu>
            </div>
          </Sider>

          <Layout className={styles.bodyLayout}>
            {/* 왼쪽 섹션 */}
            {!isMobile && (
            <Layout className={styles.leftSection}>
              <Content className={styles.contentPadding}>
                <div className={styles.leftColumnWrapper}>
                  <div className={`${styles.whiteCard} ${styles.chartCard}`}>
                    <h4 style={{ margin: "0 0 8px" }}>
                      {dayjs().format("YYYY-MM-DD")}
                    </h4>
                    <List
                      size="small"
                      bordered
                      dataSource={dailyList}
                      renderItem={(item) => (
                        <List.Item
                          actions={[
                            <Switch
                              size="small"
                              checked={item.statusID === "done"}
                              onChange={() => handleToggleStatus(item.id)}
                              checkedChildren="완료"
                              unCheckedChildren="진행"
                            />,
                          ]}
                        >
                          <Text delete={item.statusID === "done"}>
                            {item.title}
                          </Text>
                        </List.Item>
                      )}
                    />
                  </div>
                  <div className={`${styles.whiteCard} ${styles.chartCard}`}>
                    <h4 style={{ margin: "0 0 8px" }}>Donut</h4>
                    <div className={styles.chartContainer}>
                      <ResponsivePie
                        data={donutData}
                        innerRadius={0.5}
                        colors={{ datum: "data.color" }}
                        enableArcLinkLabels={false}
                      />
                    </div>
                  </div>
                  <div className={`${styles.whiteCard} ${styles.chartCard}`}>
                    <h4 style={{ margin: "0 0 8px" }}>Waffle</h4>
                    <div className={styles.chartContainer}>
                      <ResponsiveWaffle
                        data={waffleData}
                        total={100}
                        rows={10}
                        columns={10}
                        colors={(d) => d.color}
                        tooltip={(node) => {
                          if (!node.data) return null;
                          const { id, value, color } = node.data;
                          return (
                            <div className={styles.chartTooltip}>
                              <div
                                className={styles.tooltipColorBox}
                                style={{ backgroundColor: color }}
                              />
                              <span>{id}:</span>
                              <span className={styles.tooltipValue}>
                                {value}
                              </span>
                            </div>
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Content>
            </Layout>
            )}

            {/* 중앙 섹션 */}
            <Layout className={`${styles.middleSection} ${isSideVisible && !isMobile ? styles.middleNarrow : styles.middleWide}`}>
              <Content className={styles.contentPadding}>
                <div className={styles.fullHeight}>
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <FullCalendar
                          events={events.filter(
                            (e) => e.statusID !== "deleted",
                          )}
                          onDelete={handleMoveToTrash}
                          onSelectEvent={handleSelectEvent}
                          onEventDrop={handleEventDrop}
                        />
                      }
                    />
                    <Route path="/user" element={<LoginPage />} />
                    <Route
                      path="/completed"
                      element={
                        <CompletedList
                          events={events}
                          onToggleStatus={handleToggleStatus}
                        />
                      }
                    />
                    <Route
                      path="/rubbish"
                      element={
                        <DeleteList
                          events={events}
                          onRestore={handleRestore}
                          onPermanentDelete={handlePermanentDelete}
                        />
                      }
                    />
                  </Routes>
                </div>
              </Content>
              {!isMobile && (
              <div
                className={styles.sideToggleButton}
                onClick={() => {
                  setIsSideVisible(!isSideVisible);
                  setTimeout(
                    () => window.dispatchEvent(new Event("resize")),
                    300,
                  );
                }}
              >
                {isSideVisible ? (
                  <VerticalLeftOutlined />
                ) : (
                  <VerticalRightOutlined />
                )}
              </div>
              )}
            </Layout>

            {/* 우측 섹션 */}
            {isMobile ? (
              <Drawer
                title={selectedEvent ? "일정 수정" : "새 일정 등록"}
                placement="bottom"
                height="80%"
                onClose={() => {
                  setIsDrawerOpen(false);
                  setSelectedEvent(null);
                }}
                open={isDrawerOpen || !!selectedEvent} // 이벤트 선택 시 자동으로 열림
                bodyStyle={{ padding: 0 }}
              >
                <TodoForm
                  key={selectedEvent?.id || "new-event"}
                  initialData={selectedEvent}
                  onSubmit={(data) => {
                    handleSaveEvent(data);
                    setIsDrawerOpen(false);
                  }}
                  onDelete={(id) => {
                    handleDeleteEvent(id);
                    setSelectedEvent(null);
                    setIsDrawerOpen(false);
                  }}
                />
              </Drawer>
            ) : (
            <Layout
              className={`${styles.rightSection} ${isSideVisible ? styles.rightOpen : styles.rightClosed}`}
            >
              <Content className={styles.contentPadding}>
                <div className={styles.fullHeight}>
                  <TodoForm
                    key={selectedEvent?.id || "new-event"}
                    initialData={selectedEvent}
                    onSubmit={handleSaveEvent}
                    onDelete={(id) => {
                      handleDeleteEvent(id);
                      setSelectedEvent(null);
                    }}
                  />
                </div>
              </Content>
            </Layout>
            )}
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
