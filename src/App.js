import React, { useState, useEffect } from "react";
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import { Layout, Menu, List, Switch, Typography, ConfigProvider } from "antd";
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

import FullCalendar from "./component/FullCalendar/page";
import TodoForm from "./component/TodoForm/page";
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
  const navigate = useNavigate();
  const location = useLocation();

  const { isSideVisible, setIsSideVisible } = useCalendar();
  const { dailyList, donutData, waffleData } = useCalendarData(events);

  const handleDeleteEvent = (id) => {
    setEvents((prev) => prev.filter((event) => event.id !== String(id)));
  };

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
    const pathMap = {
      "/": "2",
      "/user": "1",
      "/completed": "3",
      "/rubbish": "4",
    };
    setSelectedKey(pathMap[location.pathname] || "2");
  }, [location.pathname]);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSaveEvent = (formData) => {
  if (!formData.title) return;

  setEvents((prev) => {
    const isExisting = formData.id && prev.some((e) => String(e.id) === String(formData.id));

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
          : e
      );
    } else {
      const newEvent = {
        ...formData,
        id: String(Date.now()),
        start: formData.dateRange?.[0],
        end: formData.dateRange?.[1],
        statusID: "created",
      };
      return [...prev, newEvent];
    }
  });
};

  const handleSelectEvent = (eventData) => {
    if (!eventData) {
      setSelectedEvent(null);
      return;
    }

    const target = events.find((e) => e.id === String(eventData.id));
    if (target) setSelectedEvent(target);
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

  return (
    <ConfigProvider locale={locale}>
      <Layout style={{ height: "100vh", overflow: "hidden" }}>
        <Layout>
          <Sider
            collapsed={true}
            collapsedWidth={80}
            width={80}
            style={{ backgroundColor: "#F4E6F1" }}
          >
            <div
              style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "#F4E6F1",
              }}
            >
              <Menu
                mode="inline"
                selectedKeys={[selectedKey]}
                inlineCollapsed={true}
                style={{ backgroundColor: "transparent", border: "none" }}
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
                <Menu.Item
                  key="0"
                  style={{ fontWeight: "bold", textAlign: "center", padding: "0px" }}
                >
                  <Link to="/">PODODO</Link>
                </Menu.Item>
                <Menu.Item
                  key="1"
                  icon={<UserOutlined />}
                  style={{
                    backgroundColor:
                      selectedKey === "1" ? "#D1A7E1" : "transparent",
                  }}
                >
                  USER
                </Menu.Item>
                <Menu.Item
                  key="2"
                  icon={<CalendarOutlined />}
                  style={{
                    backgroundColor:
                      selectedKey === "2" ? "#D1A7E1" : "transparent",
                  }}
                >
                  CALENDAR
                </Menu.Item>
                <Menu.Item
                  key="3"
                  icon={<UnorderedListOutlined />}
                  style={{
                    backgroundColor:
                      selectedKey === "3" ? "#D1A7E1" : "transparent",
                  }}
                >
                  DONE
                </Menu.Item>
                <Menu.Item
                  key="4"
                  icon={<DeleteOutlined />}
                  style={{
                    color: "red",
                    backgroundColor:
                      selectedKey === "4" ? "#D1A7E1" : "transparent",
                  }}
                >
                  TRASH
                </Menu.Item>
              </Menu>
              <Menu
                mode="inline"
                style={{ backgroundColor: "transparent", border: "none" }}
              >
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

          <Layout
            style={{
              flexDirection: "row",
              overflow: "hidden",
              backgroundColor: "#fff5fb",
            }}
          >
            <Layout
              style={{
                width: "20%",
                backgroundColor: "#fff5fb",
                borderRight: "1px solid #ddd",
              }}
            >
              <Content style={{ padding: "16px" }}>
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      backgroundColor: "#fefefe",
                      padding: "8px",
                      borderRadius: "8px",
                      height: "25%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
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
                  <div
                    style={{
                      flex: 1,
                      backgroundColor: "#fefefe",
                      padding: "8px",
                      borderRadius: "8px",
                      height: "25%",
                      display: "flex",
                      flexDirection: "column",
                      overflow: "hidden",
                    }}
                  >
                    <h4 style={{ margin: "0 0 8px" }}>Donut Chart</h4>
                    <div
                      style={{
                        flex: 1,
                        minHeight: 0,
                        position: "relative",
                      }}
                    >
                      <ResponsivePie
                        data={donutData}
                        innerRadius={0.5}
                        colors={{ datum: "data.color" }}
                        enableArcLinkLabels={false}
                        arcLinkLabelsSkipAngle={10}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      backgroundColor: "#fefefe",
                      padding: "8px",
                      borderRadius: "8px",
                      height: "25%",
                      display: "flex",
                      flexDirection: "column",
                      overflow: "hidden",
                    }}
                  >
                    <h4 style={{ margin: "0 0 8px" }}>Waffle Chart</h4>
                    <div
                      style={{ flex: 1, minHeight: 0, position: "relative" }}
                    >
                      <ResponsiveWaffle
                        data={waffleData}
                        total={100}
                        rows={10}
                        columns={10}
                        colors={(d) => d.color}
                        tooltip={(node) => {
                          if (!node || !node.data) return null;

                          const { id, value, color } = node.data;

                          return (
                            <div
                              style={{
                                padding: "6px 10px",
                                background: "#fff",
                                border: "1px solid #ddd",
                                borderRadius: "4px",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                color: "#333",
                                zIndex: 9999,
                                whiteSpace: "nowrap",
                                minWidth: "max-content",
                              }}
                            >
                              <div
                                style={{
                                  width: 14,
                                  height: 14,
                                  backgroundColor: color,
                                  borderRadius: "2px",
                                  flexShrink: 0,
                                }}
                              />
                              <span>{id}:</span>
                              <span style={{ fontWeight: "bold" }}>
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

            <Layout
              style={{
                width: isSideVisible ? "60%" : "80%",
                transition: "width 0.3s",
                backgroundColor: "#fff5fb",
                position: "relative",
              }}
            >
              <Content style={{ padding: "16px" }}>
                <div
                  style={{
                    height: "100%",
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    padding: "16px",
                  }}
                >
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <FullCalendar
                          events={events}
                          onDelete={handleDeleteEvent}
                          onSelectEvent={handleSelectEvent}
                          onEventDrop={handleEventDrop}
                        />
                      }
                    />
                  </Routes>
                </div>
              </Content>

              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "-10px",
                  transform: "translateY(-50%)",
                  backgroundColor: "#D1A7E1",
                  color: "white",
                  padding: "4px 6px",
                  borderRadius: "6px 0 0 6px",
                  cursor: "pointer",
                  zIndex: 1000,
                  fontSize: "20px",
                }}
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
            </Layout>

            <Layout
              style={{
                width: isSideVisible ? "20%" : "0",
                transition: "width 0.3s",
                backgroundColor: "#fff5fb",
                borderLeft: isSideVisible ? "1px solid #ddd" : "none",
                overflow: "hidden",
              }}
            >
              <Content style={{ padding: "16px" }}>
                <div
                  style={{
                    height: "100%",
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                  }}
                >
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
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
