import { Modal, Input, notification, Form, Select, InputNumber } from "antd";

const { Option } = Select;

// Định nghĩa interface IProps chứa các thuộc tính cần thiết cho component
interface IProps {
  access_token: string;
  getData: any;
  setIsCreateModalOpen: (v: boolean) => void;
  isCreateModalOpen: boolean;
}

// Component tạo user
const CreateUserModal = (props: IProps) => {
  const { access_token, getData, setIsCreateModalOpen, isCreateModalOpen } =
    props;
  const [form] = Form.useForm(); // Sử dụng hook form từ Ant Design để quản lý form

  // Hàm đóng modal và reset các state về giá trị rỗng
  const handleCloseModal = () => {
    setIsCreateModalOpen(false); // Đóng modal
    form.resetFields(); // Reset giá trị trong form
  };

  // Hàm xử lý khi hoàn tất form
  const onFinish = async (values: any) => {
    // Lấy giá trị từ form
    const { name, email, password, age, gender, address, role } = values;
    const data = { name, email, password, age, gender, address, role }; // Tạo object dữ liệu user mới

    try {
      const res = await fetch("http://localhost:8000/api/v1/users", {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      const d = await res.json();
      if (d.data) {
        await getData(); // Lấy dữ liệu mới sau khi thêm user thành công
        notification.success({
          message: "Tạo mới user thành công",
        });
        handleCloseModal(); // Đóng modal sau khi thành công
      } else {
        throw new Error(d.message || "Có lỗi xảy ra trong quá trình tạo user");
      }
    } catch (error) {
      notification.error({
        message: "Có lỗi xảy ra",
        description: error.message,
      });
    }
  };

  // Hàm xử lý khi click vào OK, sẽ submit form
  const handleSubmit = () => {
    form.submit(); // Gọi submit form trực tiếp
  };

  return (
    <Modal
      title="Create New User" // Tiêu đề của modal
      open={isCreateModalOpen} // Kiểm soát trạng thái mở/đóng của modal
      onOk={handleSubmit} // Xử lý sự kiện khi nhấn OK (submit form)
      onCancel={handleCloseModal} // Xử lý sự kiện khi nhấn Cancel (đóng modal)
      maskClosable={false} // Không cho phép đóng modal khi nhấn ngoài vùng modal
    >
      <Form
        form={form} // Khai báo form để Ant Design quản lý
        name="add_new_user"
        initialValues={{ remember: true }}
        onFinish={onFinish} // Gọi hàm onFinish khi submit form
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          style={{ marginBottom: 5 }}
          label="Username"
          name="name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 5 }}
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your Email!" },
            { type: "email", message: "Email không hợp lệ!" }, // Kiểm tra email hợp lệ
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 5 }}
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 6, message: "Password must be at least 6 characters!" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 5 }}
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 5 }}
          label="Age"
          name="age"
          rules={[{ required: true, message: "Please input your Age!" }]}
        >
          <InputNumber min={1} max={123} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 5 }}
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please choose your gender!" }]}
        >
          <Select>
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
            <Option value="Binary">Binary</Option>
          </Select>
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 5 }}
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your Address!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 5 }}
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please input your Role!" }]}
        >
          <Select>
            <Option value="Admin">Admin</Option>
            <Option value="User">User</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateUserModal;
