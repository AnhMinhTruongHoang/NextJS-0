import { useEffect, useState } from "react";
import "../../style/user.css";
import { json } from "stream/consumers";

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
  };

  // Kiểm tra danh sách người dùng đã lưu trong state
  console.log("check listUsers", listUsers);

  ///////////////////////////////
  return (
    <div>
      <h2> Table Users</h2>

      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {listUsers.map((item: IUsers) => {
            return (
              <tr key={item._id}>
                <td>{item.email}</td>
                <td>{item.name}</td>
                <td>{item.role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
