import { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import Table from "antd/es/table";
import { Button, notification, Popconfirm, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import CreateUserModal from "./Create.user.modal";
import UpdateUserModal from "./UpdateUsers.modal";

// Định nghĩa interface cho đối tượng Users (người dùng)
export interface IUsers {
  _id: string;
  email: string;
  name: string;
  role: string;
  address: string;
  gender: string;
  password: string;
  age: string;
}

// Hàm component chính hiển thị bảng người dùng
const UsersTable = () => {
  // Chuỗi token để xác thực khi gọi API
  const access_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjZkNWQ5YzUzNzlhNmVhNzlkODJhY2I5IiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MjUzNzUxNjYsImV4cCI6MTgxMTc3NTE2Nn0.5C8V5Qmd2OrEW2_WkVvdjjVTr2ZZSeYO6ttbUcgvGI4";

  // State để điều khiển việc mở modal tạo mới người dùng
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // State để điều khiển việc mở modal cập nhật người dùng
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // State để lưu danh sách người dùng
  const [listUsers, setListUsers] = useState<IUsers[]>([]);

  // State lưu dữ liệu người dùng cần cập nhật
  const [dataUpdate, setDataUpdate] = useState<null | IUsers>(null);

  // Sử dụng useEffect để gọi hàm lấy dữ liệu ngay khi component được render
  useEffect(() => {
    getData();
  }, []);

  // Hàm lấy dữ liệu người dùng từ API
  const getData = async () => {
    // Gọi API để lấy toàn bộ danh sách người dùng
    const res = await fetch("http://localhost:8000/api/v1/users/all", {
      headers: {
        Authorization: `Bearer ${access_token}`, // Gửi token trong header để xác thực
        "Content-Type": "application/json",
      },
    });

    // Chuyển đổi phản hồi từ API thành JSON
    const d = await res.json();

    // Kiểm tra nếu không có dữ liệu trả về thì thông báo lỗi
    if (!d.data) {
      notification.error({
        message: JSON.stringify(d.message),
      });
    }

    // Cập nhật state listUsers với dữ liệu người dùng nhận được từ API
    setListUsers(d.data.result);

    // Kiểm tra danh sách người dùng qua console log
    console.log("check listUsers", listUsers);
  };
  const confirm = async (user: IUsers) => {
    const res = await fetch(`http://localhost:8000/api/v1/users/${user._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    const d = await res.json();
    if (d.data) {
      notification.success({
        message: "Delete success",
      });
      await getData();
    } else {
      notification.error({
        message: JSON.stringify(d.message),
      });
    }
  };

  // Cấu hình cột của bảng sử dụng ant design
  const columns: ColumnsType<IUsers> = [
    {
      title: "Email",
      dataIndex: "email",
      render: (value, record) => {
        // Tạo liên kết cho trường email, khi bấm sẽ mở trang ant design trong tab mới
        console.log("check col", value, record); // Kiểm tra dữ liệu trong từng cột
        return (
          <a
            href="https://ant.design/components/table"
            target="_blank"
            rel="noopener noreferrer"
          >
            {record.email}
          </a>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Actions", // Cột này chứa các nút hành động
      render: (value, record) => {
        return (
          <div>
            <Button
              type="primary"
              onClick={() => {
                setDataUpdate(record); // Lưu thông tin người dùng vào state để cập nhật
                setIsUpdateModalOpen(true); // Mở modal cập nhật người dùng
              }}
            >
              Edit
            </Button>

            <Popconfirm
              title={`Delete user (${record.name})`}
              description="Are you sure to delete this user ?"
              onConfirm={() => confirm(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger style={{ marginLeft: 15 }}>
                Delete
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  // Trả về giao diện bảng người dùng và các modal
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ color: "greenyellow" }}> Table Users</h2>
        <div>
          <PlusCircleOutlined
            onClick={() => setIsCreateModalOpen(true)} // Mở modal tạo mới người dùng khi click vào icon
            style={{ color: "green", fontSize: "24px" }}
          >
            Add new
          </PlusCircleOutlined>
        </div>
      </div>

      {/* Bảng hiển thị danh sách người dùng */}
      <Table columns={columns} dataSource={listUsers} rowKey={"_id"} />

      {/* Modal tạo mới người dùng */}
      <CreateUserModal
        access_token={access_token}
        getData={getData}
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />

      {/* Modal cập nhật người dùng */}
      <UpdateUserModal
        access_token={access_token}
        getData={getData}
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />
    </div>
  );
};

export default UsersTable;
