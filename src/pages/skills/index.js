import { Form } from "antd";
import SkillsItem from "../skillsItem";
import { useState, useEffect } from "react";
import "./index.css";
const Skills = ({ form, handleNextStep }) => {
  const [disabled, setDisabled] = useState(true);

  const [skillList, setSkillList] = useState([<SkillsItem key={0} i={0} />]);
  const handleAddSkill = ({ timeStamp }) => {
    setSkillList([
      ...skillList,
      <SkillsItem key={timeStamp} i={skillList.length} />,
    ]);
  };
  const handleDeleteSkill = () => {
    skillList.pop();
    setSkillList([...skillList]);
  };
  useEffect(() => {
    if (skillList.length > 1) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [skillList]);
  return (
    <div className="skill_form_div">
      <h3 style={{ textAlign: "center" }}>Add your Skills</h3>

      <Form form={form} className="form_skill" onFinish={handleNextStep}>
        {skillList.map((skill) => skill)}
      </Form>
      <div className="delete_add_div">
        <button
          className="delete_add_btn white_btn"
          onClick={handleDeleteSkill}
          disabled={disabled}
        >
          DELETE SKILL
        </button>
        <button className="delete_add_btn blue_btn" onClick={handleAddSkill}>
          {" "}
          ADD SKILL
        </button>
      </div>
    </div>
  );
};
export default Skills;
