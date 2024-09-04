import { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import Table from "antd/es/table";
import { Modal, Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Value } from "sass";

// Định nghĩa interface cho đối tượng Users (người dùng)
interface IUsers {
  _id: string;
  email: string;
  name: string;
  role: string;
}

// Hàm component chính hiển thị bảng người dùng
const UsersTable = () => {
  // Sử dụng hook useState để khai báo một state listUsers lưu danh sách người dùng
  const [listUsers, setListUsers] = useState<IUsers[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

  // Sử dụng hook useEffect để gọi hàm getData() một lần khi component được render
  useEffect(() => {
    getData();
  }, []);

  ///////////////// Hàm lấy dữ liệu người dùng
  const getData = async () => {
    // Chuỗi access_token sử dụng để xác thực khi gọi API
    const access_token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjZkNWQ5YzUzNzlhNmVhNzlkODJhY2I5IiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MjUzNzUxNjYsImV4cCI6MTgxMTc3NTE2Nn0.5C8V5Qmd2OrEW2_WkVvdjjVTr2ZZSeYO6ttbUcgvGI4";

    //////////// Gọi API để lấy toàn bộ người dùng
    const res = await fetch("http://localhost:8000/api/v1/users/all", {
      headers: {
        Authorization: `Bearer ${access_token}`, // Gửi token trong header để xác thực
        "Content-Type": "application/json",
      },
      // method: "POST",
      // body: JSON.stringify({
      //   username: "hoidanit@gmail.com",
      //   password: "123456",
      // }),
    });

    // Chuyển đổi phản hồi từ API thành JSON
    const d = await res.json();

    // Hiển thị kết quả dữ liệu trong console để kiểm tra
    console.log("check d1 ", d.data.result);

    // Cập nhật state listUsers với dữ liệu người dùng nhận được từ API
    setListUsers(d.data.result);
    // Kiểm tra danh sách người dùng đã lưu trong state
    console.log("check listUsers", listUsers);
  };

  /////////////////////////////// ant design table
  const columns: ColumnsType<IUsers> = [
    {
      title: "Email",
      dataIndex: "email",
      render: (value, record) => {
        /////// chuyen doi text thanh duong dan link dung the a
        console.log("check col", value, record);
        ///////  check xem value , record la gi ?
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
  ];
  //////////////// modal pop up !
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const data = {
      name,
      email,
      password,
      age,
      gender,
      address,
      role,
    };
    console.log('dd',data);
    // setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  ////////////////
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
            onClick={showModal}
            style={{ color: "green", fontSize: "24px" }}
            spin={true}
          >
            Add new
          </PlusCircleOutlined>
        </div>
      </div>
      <Table columns={columns} dataSource={listUsers} rowKey={"_id"} />

      <Modal ////////// modal pop up !
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
      >
        <div>
          <label>Name:</label>
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <Input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <Input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <label>Age:</label>
          <Input value={age} onChange={(event) => setAge(event.target.value)} />
        </div>
        <div>
          <label>Gender:</label>
          <Input
            value={gender}
            onChange={(event) => setGender(event.target.value)}
          />
        </div>
        <div>
          <label>Address:</label>
          <Input
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>
        <div>
          <label>Role:</label>
          <Input
            value={role}
            onChange={(event) => setRole(event.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default UsersTable;
