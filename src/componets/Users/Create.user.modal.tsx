import { Modal, Input, notification } from "antd";
import { useState } from "react";

interface IProps {
  access_token: string;
  getData: any;
  setIsCreateModalOpen: (v: boolean) => void;
  isCreateModalOpen: boolean;
}

const CreateUserModal = (props: IProps) => {
  const { access_token, getData, setIsCreateModalOpen, isCreateModalOpen }= props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  ///////////////////////
  const handleOk = async () => {
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

    const res = await fetch("http://localhost:8000/api/v1/users", {
      headers: {
        Authorization: `Bearer ${access_token}`, // Gửi token trong header để xác thực
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ ...data }),
    });

    // Chuyển đổi phản hồi từ API thành JSON
    const d = await res.json();
    if (d.data) {
      await getData();
      notification.success({
        message: "Tạo mới user thành công",
      });
      handleCloseModal();
    } else {
      notification.error({
        message: "Có lỗi xẩy ra",
        description: JSON.stringify(d.message),
      });
    }
  };

  ////////////////

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    setName("");
    setEmail("");
    setAge("");
    setAddress("");
    setRole("");
    setGender("");
    setPassword("");
  };
  ///////////////////////////////
  return (
    <div>
      <Modal ////////// modal pop up !
        title="Basic Modal"
        open={isCreateModalOpen}
        onOk={handleOk}
        onCancel={() => handleCloseModal()}
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

export default CreateUserModal;
