import React, { useState, useRef } from "react";
import { Layout, Menu, Avatar, Badge } from "antd";
import {
  FormOutlined,
  UnorderedListOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  useNavigate,
} from "react-router-dom";
import NoteForm from "./component/NoteForm";
import NoteList from "./component/NoteList";
import RubbishList from "./component/RubbishList";
import CompletedList from "./component/CompletedList";
import CalendarPage from "./component/CalendarPage";
import FullCalendar from "./component/FullCalendar/page";

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(true); // 메뉴 기본 축소
  const [activeMenu, setActiveMenu] = useState("form");
  // const [notes, setNotes] = useState([]);
  // const [rubbish, setRubbish] = useState([]);
  // const [selectedKey, setSelectedKey] = useState("1");
  // const [isOverdueCount, setIsOverdueCount] = useState(0);
  const [isOverdueCount] = useState(0);
  const navigate = useNavigate();
  // const location = useLocation();
  const avatarRef = useRef(null);

  const renderContent = () => {
    switch (activeMenu) {
      case "form":
        return <NoteForm />;
      case "list":
        return <NoteList />;
      case "done":
        return <CompletedList />;
      case "trash":
        return <RubbishList />;
      case "calendar":
        return <CalendarPage />;
      case "FullCalendar":
        return <FullCalendar />;
      default:
        return <div>메뉴를 선택하세요</div>;
    }
  };

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
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={80}
          style={{
            backgroundColor: "#F4E6F1",
            paddingTop: "20px",
            textAlign: "center",
          }}
        >
          <Menu
            mode="inline"
            theme="light"
            selectedKeys={[activeMenu]}
            onClick={({ key }) => setActiveMenu(key)}
            style={{ backgroundColor: "#F4E6F1", borderRight: "none" }}
          >
            <Menu.Item key="form" icon={<FormOutlined />} />
            <Menu.Item key="list" icon={<UnorderedListOutlined />} />
            <Menu.Item key="done" icon={<CheckCircleOutlined />} />
            <Menu.Item key="trash" icon={<DeleteOutlined />} />
            <Menu.Item key="calendar" icon={<CalendarOutlined />} />
            <Menu.Item key="user" icon={<UserOutlined />} />
            <Menu.Item key="FullCalendar" icon={<CalendarOutlined />} />
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

          <Layout style={{ width: "60%" }}>
            <Content style={{ padding: "16px" }}>
              <div
                style={{
                  height: "100%",
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  padding: "16px",
                }}
              >
                {renderContent()}
              </div>
            </Content>
          </Layout>

          <Layout
            style={{
              width: "20%",
              backgroundColor: "#f4f4f4",
              borderLeft: "1px solid #ddd",
            }}
          >
            <Content style={{ padding: "16px" }}>
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
