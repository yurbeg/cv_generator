import { Form, Input } from "antd";
import "./index.css"
const MiniProjectItem = ({form,handleNextStep,i})=>{

    return (
        <Form form={form} className="form" onFinish={handleNextStep}>
        <Form.Item
          name={`projectName${i}`}
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
          name={`techStack${i}`}
          rules={[
            {
              required: true,
              message: "please input the technical stack!",
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
          name={`description${i}`}
          rules={[
            {
              required: true,
              message: "Please enter a description of the project!",
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