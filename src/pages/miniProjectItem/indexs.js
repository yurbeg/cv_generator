import { Form, Input } from "antd";
import "./index.css"
const MiniProjectItem = ()=>{
    const [form] = Form.useForm();

    return (
        <Form form={form} className="form">
        <Form.Item
          name="projectName"
          rules={[
            {
              required: true,
              message: "Please input project name!",
            },
          ]}
          className="mini_project"
        >
          <Input
            placeholder="Project Name *"
            className="form_item_input"
          />
        </Form.Item>
        <Form.Item
          name="techStack"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
          className="mini_project"
        >
          <Input
            placeholder="Tech Stack"
            className="form_item_input"
          />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
          className="mini_project"
        >
          <Input
            placeholder="Description"
            className="form_item_input"
          />
        </Form.Item>
      </Form>
    )
}
export default MiniProjectItem