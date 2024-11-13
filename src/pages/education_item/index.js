import { Form, Input } from "antd";

const EducationItem = ()=>{
    const [form] = Form.useForm();

    return (
        <Form form={form} className="form">
        <Form.Item
          name="courseName"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
          className="form_item"
        >
          <Input
            placeholder="Course Name *"
            className="form_item_input"
          />
        </Form.Item>
        <Form.Item
          name="completionYear"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
          className="form_item"
        >
          <Input
            placeholder="Completion Year *"
            className="form_item_input"
          />
        </Form.Item>
        <Form.Item
          name="college/school"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
          className="form_item"
        >
          <Input
            placeholder="College/School *"
            className="form_item_input"
          />
        </Form.Item>
        <Form.Item
          name="percentage"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
          className="form_item"
        >
          <Input
            placeholder="Percentage *"
            className="form_item_input"
          />
        </Form.Item>
      </Form>
    )
}
export default EducationItem