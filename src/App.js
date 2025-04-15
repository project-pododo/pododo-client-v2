import "./App.css";
import {
  Route,
  Routes,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Layout, Menu, Avatar, Badge } from "antd";
import {
  FormOutlined,
  UnorderedListOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  CalendarOutlined,
  UserOutlined,
  VerticalLeftOutlined,
  VerticalRightOutlined,
} from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import NoteForm from "./component/NoteForm";
import NoteList from "./component/NoteList";
import RubbishList from "./component/RubbishList";
import CompletedList from "./component/CompletedList";
import CalendarPage from "./component/CalendarPage";
import FullCalendar from "./component/FullCalendar/page";
import dayjs from "dayjs";
import axios from "axios";

const { Header, Sider, Content } = Layout;

const App = () => {
  const [notes, setNotes] = useState([]);
  const [rubbish, setRubbish] = useState([]);
  const [selectedKey, setSelectedKey] = useState("1");
  const [isOverdueCount, setIsOverdueCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const avatarRef = useRef(null);
  const [isSideVisible, setIsSideVisible] = useState(false);

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

  const fetchOverdueCount = async () => {
    try {
      const response = await axios.get("/api/v1/todo");

      if (response.data && response.data.code === "10000") {
        const overdueCount = response.data.data.filter((item) => {
          const endDate = dayjs(item.endDate);
          return endDate.isBefore(dayjs()) && item.todoStatus !== "DONE";
        }).length;

        setIsOverdueCount(overdueCount);
      } else {
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchOverdueCount();
  }, []);

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setSelectedKey("1");
        break;
      case "/list":
        setSelectedKey("2");
        break;
      case "/completed":
        setSelectedKey("3");
        break;
      case "/rubbish":
        setSelectedKey("4");
        break;
      case "/CalendarPage":
        setSelectedKey("5");
        break;
      case "/NoteForm":
        setSelectedKey("6");
        break;
      default:
        setSelectedKey("1");
    }
  }, [location.pathname]);

  return (
    <Layout style={{ height: "100vh" }}>
      <Header
        style={{
          backgroundColor: "#D1A7E1",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
          cursor: "pointer",
        }}
      >
        <h1
          style={{ color: "white", margin: 0 }}
          onClick={() => navigate("/")}
        >
          PODODO
          <img
            src="/images/icon-grapes.png"
            alt="logo"
            style={{ width: "28px", marginLeft: "4px" }}
          />
        </h1>{" "}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginRight: "20px",
          }}
        >
          <Badge count={isOverdueCount} showZero offset={[10, 0]}>
            <Avatar
              ref={avatarRef}
              size="large"
              icon={<UserOutlined />}
              style={{ backgroundColor: "#ffffff", color: "#D1A7E1" }}
            />{" "}
          </Badge>
        </div>
      </Header>

      <Layout>
        <Sider
          collapsed={true}
          collapsedWidth={80}
          width={80}
          className="site-layout-background"
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            inlineCollapsed={true}
            style={{ height: "100vh", backgroundColor: "#F4E6F1" }}
            onSelect={({ key }) => {
              setSelectedKey(key);
              switch (key) {
                case "1":
                  navigate("/");
                  break;
                case "2":
                  navigate("/list");
                  break;
                case "3":
                  navigate("/completed");
                  break;
                case "4":
                  navigate("/rubbish");
                  break;
                case "5":
                  navigate("/CalendarPage");
                  break;
                case "6":
                  navigate("/NoteForm");
                  break;
                default:
                  navigate("/");
              }
            }}
          >
            <Menu.Item
              key="1"
              icon={<CalendarOutlined />}
              style={{
                backgroundColor:
                  selectedKey === "1" ? "#D1A7E1" : "transparent",
              }}
            >
              <Link to="/">FullCalendar</Link>
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<UnorderedListOutlined />}
              style={{
                backgroundColor:
                  selectedKey === "2" ? "#D1A7E1" : "transparent",
              }}
            >
              <Link to="/list">NoteList</Link>
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<CheckCircleOutlined />}
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
            <Menu.Item
              key="5"
              icon={<CalendarOutlined />}
              style={{
                backgroundColor:
                  selectedKey === "5" ? "#D1A7E1" : "transparent",
              }}
            >
              <Link to="/CalendarPage">Calendar</Link>
            </Menu.Item>
            <Menu.Item
              key="6"
              icon={<FormOutlined />}
              style={{
                backgroundColor:
                  selectedKey === "6" ? "#D1A7E1" : "transparent",
              }}
            >
              <Link to="/NoteForm">NoteForm</Link>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout
          style={{
            display: "flex",
            flex: 1,
            height: "100vh",
            flexDirection: "row",
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
              <div style={{ height: "100%", backgroundColor: "#fefefe" }}></div>
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
              ></div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
