import "./App.css";
import {
  Route,
  Routes,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Layout, Menu, List, Switch, Typography } from "antd";
import {
  UserOutlined,
  UnorderedListOutlined,
  DeleteOutlined,
  CalendarOutlined,
  VerticalLeftOutlined,
  VerticalRightOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import NoteForm from "./component/NoteForm";
import NoteList from "./component/NoteList";
import RubbishList from "./component/RubbishList";
import CompletedList from "./component/CompletedList";
import CalendarPage from "./component/CalendarPage";
import FullCalendar from "./component/FullCalendar/page";
import TodoForm from "./component/TodoForm/page";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveWaffle } from "@nivo/waffle";
import dayjs from "dayjs";

const { Sider, Content } = Layout;

const App = () => {
  const [notes, setNotes] = useState([]);
  const [rubbish, setRubbish] = useState([]);
  const [selectedKey, setSelectedKey] = useState("1");
  const navigate = useNavigate();
  const location = useLocation();
  const [isSideVisible, setIsSideVisible] = useState(true);

  const handleUpdateNote = (id, updateNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? updateNote : note))
    );
  };

  const handleAddNote = (title, content, dateRange) => {
    const newNote = { id: Date.now(), title, content, dateRange };
    setNotes([...notes, newNote]);
  };

  const handleDelete = (id) => {
    const deleteNote = notes.find((note) => note.id === id);
    if (!deleteNote) return;

    const updateNotes = notes.filter((note) => note.id !== id);
    setNotes([...updateNotes]);

    setRubbish((prevRubbish) => [...prevRubbish, deleteNote]);
    console.log("updated Note:", updateNotes);
  };

  const handleRestore = (id) => {
    const restoreNote = rubbish.find((note) => note.id === id);
    if (restoreNote) {
      setNotes([...notes, restoreNote]);
      setRubbish(rubbish.filter((note) => note.id !== id));
    }
  };

  const { Text } = Typography;

  const [dailyList, setDailyList] = useState([
    // 나중에 당일 기준으로 리스트업
    { id: 1, text: "회의 참석", done: false },
    { id: 2, text: "기획서 작성", done: false },
    { id: 3, text: "코드 리뷰", done: true },
    { id: 4, text: "운동하기", done: false },
  ]);

  const toggleDone = (id) => {
    setDailyList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setSelectedKey("2");
        break;
      case "/user":
        setSelectedKey("1");
        break;
      case "/completed":
        setSelectedKey("3");
        break;
      case "/rubbish":
        setSelectedKey("4");
        break;
      case "/logo":
        setSelectedKey("5");
        break;
      default:
        setSelectedKey("2");
    }
  }, [location.pathname]);

  const rawStatusData = [
    { id: "완료", value: 27 },
    { id: "진행 중", value: 25 },
    { id: "미완료", value: 18 },
    { id: "보류", value: 30 },
  ];

  const statusColors = {
    완료: "rgb(251, 180, 174)",
    "진행 중": "rgb(179, 205, 227)",
    보류: "rgb(222, 203, 228)",
    미완료: "rgb(204, 235, 197)",
  };

  const donutData = rawStatusData.map((item) => ({
    ...item,
    label: item.id,
    color: statusColors[item.id],
  }));

  const waffleData = rawStatusData.map((item) => ({
    ...item,
    label: item.id,
    color: statusColors[item.id],
  }));

  // const donutData = [
  //   { id: "완료", label: "완료", value: 27 },
  //   { id: "진행 중", label: "진행 중", value: 25 },
  //   { id: "미완료", label: "미완료", value: 18 },
  //   { id: "보류", label: "보류", value: 30 },
  // ];

  // const waffleData = [
  //   { id: "완료", label: "완료", value: 27, color: "rgb(251, 180, 174)" },
  //   { id: "진행 중", label: "진행 중", value: 25, color: "rgb(179, 205, 227)" },
  //   { id: "보류", label: "보류", value: 30, color: "rgb(222, 203, 228)" },
  //   { id: "미완료", label: "미완료", value: 18, color: "rgb(204, 235, 197)" },
  // ];

  const [isNarrow, setIsNarrow] = useState(window.innerWidth < 480);

  useEffect(() => {
    const handleResize = () => {
      setIsNarrow(window.innerWidth < 1268);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const legends = [
    {
      anchor: "left",
      direction: "column",
      justify: false,
      translateX: 0,
      itemWidth: 100,
      itemHeight: 20,
      itemsSpacing: 4,
      symbolSize: 20,
      symbolShape: "square",
    },
  ];

  useEffect(() => {
    const handleToggleSidebar = (e) => {
      if (e.detail?.open === true && isSideVisible === false) {
        setIsSideVisible(true);
        setTimeout(() => window.dispatchEvent(new Event("resize")), 300);
      }
    };
    window.addEventListener("toggleSidebar", handleToggleSidebar);
    return () =>
      window.removeEventListener("toggleSidebar", handleToggleSidebar);
  }, [isSideVisible]);

  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      <Layout>
        <Sider
          collapsed={true}
          collapsedWidth={80}
          width={80}
          className="site-layout-background"
        >
          <div
            style={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              backgroundColor: "#F4E6F1",
              overflow: "hidden",
            }}
          >
            <Menu
              mode="inline"
              selectedKeys={[selectedKey]}
              inlineCollapsed={true}
              style={{ backgroundColor: "transparent" }}
              onSelect={({ key }) => {
                setSelectedKey(key);
                switch (key) {
                  case "0":
                    setSelectedKey("2");
                    navigate("/");
                    break;
                  case "1":
                    setSelectedKey("1");
                    navigate("/user");
                    break;
                  case "2":
                    setSelectedKey("2");
                    navigate("/");
                    break;
                  case "3":
                    setSelectedKey("3");
                    navigate("/completed");
                    break;
                  case "4":
                    setSelectedKey("4");
                    navigate("/rubbish");
                    break;
                  case "5":
                    setSelectedKey("5");
                    navigate("/logo");
                    break;
                  default:
                    navigate("/");
                }
              }}
            >
              <Menu.Item
                key="0"
                style={{
                  padding: 0,
                  fontWeight: "bold",
                  textAlign: "center",
                  backgroundColor:
                    selectedKey === "0" ? "#D1A7E1" : "transparent",
                }}
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
                <Link to="/user">USER</Link>
              </Menu.Item>
              <Menu.Item
                key="2"
                icon={<CalendarOutlined />}
                style={{
                  backgroundColor:
                    selectedKey === "2" ? "#D1A7E1" : "transparent",
                }}
              >
                <Link to="/">FullCalendar</Link>
              </Menu.Item>
              <Menu.Item
                key="3"
                icon={<UnorderedListOutlined />}
                style={{
                  backgroundColor:
                    selectedKey === "3" ? "#D1A7E1" : "transparent",
                }}
              >
                <Link to="/completed">CompletedList</Link>
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
                <Link to="/rubbish">휴지통</Link>
              </Menu.Item>
            </Menu>
            <Menu
              mode="inline"
              selectedKeys={[selectedKey]}
              inlineCollapsed={true}
              style={{ backgroundColor: "transparent" }}
            >
              <Menu.Item
                key="5"
                icon={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src="/images/icon-grapes.png"
                      alt="logo"
                      style={{ width: "24px" }}
                    />
                  </div>
                }
                style={{
                  backgroundColor:
                    selectedKey === "5" ? "#D1A7E1" : "transparent",
                }}
              >
                <Link to="/logo">LOGO</Link>
              </Menu.Item>
            </Menu>
          </div>
        </Sider>

        <Layout
          style={{
            display: "flex",
            flex: 1,
            height: "100vh",
            flexDirection: "row",
            overflow: "hidden",
          }}
        >
          {/* chart */}
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
                  backgroundColor: "#fefefe",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {/* 1. 데일리 리스트 */}
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
                            checked={item.done}
                            onChange={() => toggleDone(item.id)}
                            checkedChildren="완료"
                            unCheckedChildren="진행"
                          />,
                        ]}
                      >
                        <Text delete={item.done}>{item.text}</Text>
                      </List.Item>
                    )}
                  />
                </div>

                {/* 2. 도넛 차트 */}
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
                  <h4 style={{ margin: "0 0 8px" }}>Test Chart</h4>
                  <div style={{ height: "100%", width: "100%" }}>
                    <ResponsivePie
                      data={donutData}
                      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                      innerRadius={0.6}
                      padAngle={1}
                      cornerRadius={3}
                      activeOuterRadiusOffset={8}
                      colors={{ scheme: "pastel1" }}
                      borderWidth={1}
                      borderColor={{
                        from: "color",
                        modifiers: [["darker", 0.2]],
                      }}
                      arcLinkLabelsSkipAngle={10}
                      arcLinkLabelsTextColor="#333"
                      arcLinkLabelsThickness={2}
                      arcLinkLabelsColor={{ from: "color" }}
                      arcLabelsSkipAngle={10}
                      arcLabelsTextColor={{
                        from: "color",
                        modifiers: [["darker", 2]],
                      }}
                    />
                  </div>
                </div>

                {/* 3. 여유 공간 */}
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "#fafafa",
                    borderRadius: "8px",
                    height: "25%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h4 style={{ margin: "0 0 8px" }}>여유 공간</h4>
                </div>

                {/* 4. 와플 차트 */}
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
                  <h4 style={{ margin: "0 0 8px" }}>Test Waffle</h4>
                  <div style={{ height: "100%", width: "100%" }}>
                    <ResponsiveWaffle
                      data={waffleData}
                      total={100}
                      rows={10}
                      columns={10}
                      fillDirection="top"
                      padding={1}
                      colors={waffleData.map((d) => d.color)}
                      colorBy="id"
                      borderColor={{
                        from: "color",
                        modifiers: [["darker", 0.3]],
                      }}
                      animate={true}
                      motionStiffness={90}
                      motionDamping={11}
                      legends={!isNarrow ? legends : undefined}
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
                  <Route path="/" element={<FullCalendar />} />
                  <Route
                    path="/list"
                    element={
                      <NoteList
                        notes={notes}
                        onDelete={handleDelete}
                        onUpdate={handleUpdateNote}
                      />
                    }
                  />
                  <Route
                    path="/completed"
                    element={
                      <CompletedList notes={notes} onDelete={handleDelete} />
                    }
                  />
                  <Route
                    path="/rubbish"
                    element={
                      <RubbishList
                        rubbish={rubbish}
                        onRestore={handleRestore}
                      />
                    }
                  />
                  <Route
                    path="/CalendarPage"
                    element={
                      <CalendarPage
                        onDateClick={(clickedDate) => {
                          setIsSideVisible(true);
                          window.dispatchEvent(
                            new CustomEvent("resetTodoForm", {
                              detail: { date: clickedDate },
                            })
                          );
                        }}
                      />
                    }
                  />

                  <Route
                    path="/NoteForm"
                    element={<NoteForm onAdd={handleAddNote} />}
                  />
                </Routes>
              </div>
            </Content>
            <div
              style={{
                position: "absolute",
                top: "50%",
                right: isSideVisible ? "-10px" : "-10px",
                transform: "translateY(-50%)",
                backgroundColor: "#D1A7E1",
                color: "white",
                padding: "4px 6px",
                borderRadius: isSideVisible ? "6px 0 0 6px" : "6px 0 0 6px",
                cursor: "pointer",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                fontSize: "20px",
                zIndex: 1000,
              }}
              onClick={() => {
                setIsSideVisible((prev) => {
                  const next = !prev;
                  setTimeout(() => {
                    window.dispatchEvent(new Event("resize"));
                  }, 300);
                  return next;
                });
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
            <Content style={{ padding: "16px", position: "relative" }}>
              <div
                style={{
                  height: "100%",
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                }}
              >
                <TodoForm onSubmit={handleAddNote} />
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
