import "./App.css";
import {
  Route,
  Routes,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Layout, Menu } from "antd";
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

  const [dailyList] = useState([
    "회의 참석",
    "기획서 작성",
    "코드 리뷰",
    "운동하기",
  ]);

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
                  }}
                >
                  <h4 style={{ margin: "0 0 8px" }}>Test List</h4>
                  <ul style={{ paddingLeft: "16px", margin: 0 }}>
                    {dailyList.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* 2. 도넛 차트 */}
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "#fefefe",
                    padding: "8px",
                    borderRadius: "8px",
                  }}
                >
                  <h4 style={{ margin: "0 0 8px" }}>Test Chart</h4>
                </div>

                {/* 3~4. 여유 공간 */}
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "#fafafa",
                    borderRadius: "8px",
                  }}
                ></div>
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "#fafafa",
                    borderRadius: "8px",
                  }}
                ></div>
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
                  <Route path="/CalendarPage" element={<CalendarPage />} />
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
