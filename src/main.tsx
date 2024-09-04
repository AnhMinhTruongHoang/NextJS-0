import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./App.scss";
import {
  AppstoreOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Link,
} from "react-router-dom";
import UserPage from "./screens/User.page.tsx";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: <Link to="/">Home</Link>,
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: <Link to="/users">Manage Users</Link>,
    key: "users",
    icon: <UserOutlined />,
  },
];

const Header = () => {
  const [current, setCurrent] = useState("home");

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};
////////////////////////
const LayoutAdmin = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <App /> },
      {
        path: "users",
        element: <UserPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
