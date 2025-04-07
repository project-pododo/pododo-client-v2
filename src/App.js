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
  DeleteOutlined,
  CheckCircleOutlined,
  UserOutlined,
  CalendarOutlined,
  DragOutlined,
} from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import NoteForm from "./component/NoteForm";
import NoteList from "./component/NoteList";
import RubbishList from "./component/RubbishList";
import CompletedList from "./component/CompletedList";
import CalendarPage from "./component/CalendarPage";
import Dnd from "./component/Dnd";
import dayjs from "dayjs";
import axios from "axios";

const { Content, Sider, Header } = Layout;

function App() {
  const [notes, setNotes] = useState([]);
  const [rubbish, setRubbish] = useState([]);
  const [selectedKey, setSelectedKey] = useState("1");
  const [isOverdueCount, setIsOverdueCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const avatarRef = useRef(null);

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
      case "/Dnd":
        setSelectedKey("6");
        break;
      default:
        setSelectedKey("1");
    }
  }, [location.pathname]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
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
        <h1 style={{ color: "white", margin: 0 }} onClick={() => navigate("/")}>
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
          width={200}
          className="site-layout-background"
          style={{ backgroundColor: "#F4E6F1" }}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          breakpoint="lg"
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
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
                  navigate("/Dnd");
                  break;
                default:
                  navigate("/");
              }
            }}
            inlineCollapsed={collapsed}
            style={{ height: "100vh", backgroundColor: "#F4E6F1" }}
          >
            <Menu.Item
              key="1"
              icon={<FormOutlined />}
              style={{
                backgroundColor:
                  selectedKey === "1" ? "#D1A7E1" : "transparent",
              }}
            >
              <Link
                to="/"
                style={{
                  color: selectedKey === "1" ? "#ffffff" : "#000055",
                }}
              >
                NoteForm
              </Link>
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<UnorderedListOutlined />}
              style={{
                backgroundColor:
                  selectedKey === "2" ? "#D1A7E1" : "transparent",
              }}
            >
              <Link
                to="/list"
                style={{
                  color: selectedKey === "2" ? "#ffffff" : "#000055",
                }}
              >
                NoteList
              </Link>
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<CheckCircleOutlined />}
              style={{
                backgroundColor:
                  selectedKey === "3" ? "#D1A7E1" : "transparent",
              }}
            >
              <Link
                to="/completed"
                style={{
                  color: selectedKey === "3" ? "#ffffff" : "#000055",
                }}
              >
                CompletedList
              </Link>
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
              <Link
                to="/rubbish"
                style={{
                  color: selectedKey === "4" ? "#ffffff" : "#000055",
                }}
              >
                휴지통
              </Link>
            </Menu.Item>
            <Menu.Item
              key="5"
              icon={<CalendarOutlined />}
              style={{
                backgroundColor:
                  selectedKey === "5" ? "#D1A7E1" : "transparent",
              }}
            >
              <Link
                to="/CalendarPage"
                style={{
                  color: selectedKey === "5" ? "#ffffff" : "#000055",
                }}
              >
                Calendar
              </Link>
            </Menu.Item>
            <Menu.Item
              key="6"
              icon={<DragOutlined />}
              style={{
                backgroundColor:
                  selectedKey === "6" ? "#D1A7E1" : "transparent",
              }}
            >
              <Link
                to="/Dnd"
                style={{
                  color: selectedKey === "6" ? "#ffffff" : "#000055",
                }}
              >
                Dnd
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 380,
              height: "100%",
              backgroundColor: "#FFF5FB",
            }}
          >
            <Routes>
              <Route path="/" element={<NoteForm onAdd={handleAddNote} />} />
              <Route
                path="/list"
                element={
                  <NoteList
                    notes={notes}
                    onDelete={handleDelete}
                    onUpdate={handleUpdateNote}
                    // onOverdueChange={handleOverdueChange}
                  />
                }
              />
              <Route
                path="/completed"
                element={
                  <CompletedList
                    notes={notes}
                    onDelete={handleDelete}
                    // onOverdueChange={handleOverdueChange}
                  />
                }
              />
              <Route
                path="/rubbish"
                element={
                  <RubbishList rubbish={rubbish} onRestore={handleRestore} />
                }
              />
              <Route path="/CalendarPage" element={<CalendarPage />} />
              <Route path="/Dnd" element={<Dnd />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
