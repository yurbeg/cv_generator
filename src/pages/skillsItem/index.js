import { Form, Input } from "antd";
import "./index.css"
const SkillsItem = ()=>{
    
    return (

    <Form.Item 
        name="skill"
        rules={[
        {
          required: true,
          message: "Please input your name!",
        },
      ]}
      className="skill_item"
    >
      <Input placeholder="Skill *" className="form_item_input" />
    </Form.Item>
    )
}

export default SkillsItem