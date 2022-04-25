import { Layout, Menu, Popconfirm, Button } from "antd";
import "./index.scss";
import {
  PieChartOutlined,
  SolutionOutlined,
  FileWordOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getUserInfo } from "@/api/user";
import { useEffect, useState } from "react";

const { Header, Sider } = Layout;

const GeekLayout = () => {
  // 用户名
  const [userName, setUserName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  // 激活菜单的key
  let defaultKey = location.pathname;
  if (defaultKey.startsWith("/home")) {
    defaultKey = "/home";
  }
  // 获取用户个人资料
  const handleGetUserInfo = async () => {
    const result = await getUserInfo();
    console.log(result.data.name);
    setUserName(result.data.name);
  };
  // 退出
  const onLogout = async () => {
    localStorage.removeItem("@#@Token");
    navigate("/login", { replace: true });
  };
  useEffect(() => {
    handleGetUserInfo();
  }, []);
  return (
    <Layout className="geek-layout">
      <Sider width={148}>
        <div className="logo">GEEK</div>
        <Menu defaultSelectedKeys={["1"]} mode="inline" theme="dark">
          <Menu.Item icon={<PieChartOutlined />} key="1">
            <Link to="/home">数据面板</Link>
          </Menu.Item>

          <Menu.Item icon={<SolutionOutlined />} key="2">
            <Link to="/home/article">内容管理</Link>
          </Menu.Item>
          <Menu.Item icon={<FileWordOutlined />} key="3">
            <Link to="/home/publish">发布文章</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header>
          <span style={{ fontSize: 16 }}>极客园自媒体端</span>
          <div>
            <span>{userName}</span>
            <Popconfirm
              placement="bottomRight"
              title="您确认退出极客园自媒体端吗？"
              okText="确认"
              cancelText="取消"
              onConfirm={onLogout}
            >
              <Button type="link" icon={<LogoutOutlined />}>
                退出
              </Button>
            </Popconfirm>
          </div>
        </Header>
        <Outlet />
        {/* <Dashboard />
        <Article />
        <Publish /> */}
      </Layout>
    </Layout>
  );
};

export default GeekLayout;
