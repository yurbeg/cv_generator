import { Form, Input } from "antd";
import "./index.css"
const SkillsItem = ({i})=>{
    
    return (

    <Form.Item 
        name={`skill${i}`}
        rules={[
        {
          required: true,
          message: "Please input skill!",
        },
      ]}
      className="skill_item"
    >
      <Input placeholder="Skill *" className="form_item_input" />
    </Form.Item>
    )
}

export default SkillsItem