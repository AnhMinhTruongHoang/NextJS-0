import { Modal, Input, notification } from "antd";
import { useState } from "react";

// Định nghĩa interface IProps chứa các thuộc tính cần thiết cho component
interface IProps {
  access_token: string; // Chuỗi token xác thực được truyền vào từ ngoài
  getData: any; // Hàm để lấy dữ liệu sau khi tạo user mới thành công
  setIsCreateModalOpen: (v: boolean) => void; // Hàm thay đổi trạng thái đóng/mở modal
  isCreateModalOpen: boolean; // Trạng thái modal có đang mở hay không
}

// Component tạo user
const CreateUserModal = (props: IProps) => {
  const { access_token, getData, setIsCreateModalOpen, isCreateModalOpen } =
    props;
  /////////
  const [name, setName] = useState(""); // State cho tên user
  const [email, setEmail] = useState(""); // State cho email user
  const [password, setPassword] = useState(""); // State cho password user
  const [age, setAge] = useState(""); // State cho tuổi user
  const [gender, setGender] = useState(""); // State cho giới tính user
  const [address, setAddress] = useState(""); // State cho địa chỉ user
  const [role, setRole] = useState(""); // State cho vai trò user
  ///////////////////////
  // Hàm xử lý khi nhấn OK để tạo user mới
  const handleOk = async () => {
    // Dữ liệu người dùng được thu thập từ các state
    const data = {
      name,
      email,
      password,
      age,
      gender,
      address,
      role,
    };
    console.log("dd", data);

    // Gửi request tạo user mới tới API
    const res = await fetch("http://localhost:8000/api/v1/users", {
      headers: {
        Authorization: `Bearer ${access_token}`, // Gửi token trong header để xác thực
        "Content-Type": "application/json",
      },
      method: "POST", // Phương thức HTTP POST
      body: JSON.stringify({ ...data }), // Chuyển đổi dữ liệu user thành chuỗi JSON
    });

    // Chuyển đổi phản hồi từ API thành JSON
    const d = await res.json();
    if (d.data) {
      // Nếu tạo user thành công, gọi hàm lấy dữ liệu và hiện thông báo thành công
      await getData();
      notification.success({
        message: "Tạo mới user thành công", // Thông báo thành công
      });
      handleCloseModal(); // Đóng modal và reset các trường input
    } else {
      // Nếu có lỗi xảy ra, hiển thị thông báo lỗi
      notification.error({
        message: "Có lỗi xẩy ra", // Tiêu đề thông báo lỗi
        description: JSON.stringify(d.message), // Mô tả lỗi chi tiết
      });
    }
  };

  ////////////////
  // Hàm đóng modal và reset các state về giá trị rỗng
  const handleCloseModal = () => {
    setIsCreateModalOpen(false); // Đóng modal
    setName(""); // Reset tên
    setEmail(""); // Reset email
    setAge(""); // Reset tuổi
    setAddress(""); // Reset địa chỉ
    setRole(""); // Reset vai trò
    setGender(""); // Reset giới tính
    setPassword(""); // Reset password
  };
  ///////////////////////////////
  return (
    <div>
      <Modal ////////// Modal pop up hiển thị form tạo user
        title="Basic Modal"
        open={isCreateModalOpen} // Kiểm soát trạng thái mở/đóng của modal
        onOk={handleOk} // Xử lý sự kiện khi nhấn OK
        onCancel={() => handleCloseModal()} // Xử lý sự kiện khi nhấn Cancel
        maskClosable={false} // Không cho phép đóng modal khi nhấn ngoài vùng modal
      >
        {/* Các input để nhập thông tin user */}
        <div>
          <label>Name:</label>
          <Input
            value={name} // Giá trị của input name
            onChange={(event) => setName(event.target.value)} // Cập nhật state khi người dùng nhập
          />
        </div>
        <div>
          <label>Email:</label>
          <Input
            value={email} // Giá trị của input email
            onChange={(event) => setEmail(event.target.value)} // Cập nhật state khi người dùng nhập
          />
        </div>
        <div>
          <label>Password:</label>
          <Input
            value={password} // Giá trị của input password
            onChange={(event) => setPassword(event.target.value)} // Cập nhật state khi người dùng nhập
          />
        </div>
        <div>
          <label>Age:</label>
          <Input
            value={age} // Giá trị của input age
            onChange={(event) => setAge(event.target.value)} // Cập nhật state khi người dùng nhập
          />
        </div>
        <div>
          <label>Gender:</label>
          <Input
            value={gender} // Giá trị của input gender
            onChange={(event) => setGender(event.target.value)} // Cập nhật state khi người dùng nhập
          />
        </div>
        <div>
          <label>Address:</label>
          <Input
            value={address} // Giá trị của input address
            onChange={(event) => setAddress(event.target.value)} // Cập nhật state khi người dùng nhập
          />
        </div>
        <div>
          <label>Role:</label>
          <Input
            value={role} // Giá trị của input role
            onChange={(event) => setRole(event.target.value)} // Cập nhật state khi người dùng nhập
          />
        </div>
      </Modal>
    </div>
  );
};

export default CreateUserModal;
