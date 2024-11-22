import { useEffect, useState } from "react";
import EducationItem from "../education_item";
import "./index.css";
import { Button } from "antd";

const Education = ({ form, handleNextStep }) => {
  const [disabled, setDisabled] = useState(true);
  const [educationList, setEducationList] = useState([0]); 

  const handleAddEducation = () => {
    setEducationList(prevList => [...prevList, prevList.length]); 
  };

  const handleDeleteEducation = () => {
    if (educationList.length > 1) {
      setEducationList(prevList => prevList.slice(0, -1)); 
    }
  };

  useEffect(() => {
    setDisabled(educationList.length <= 1);
  }, [educationList]);

  return (
    <div className="main_form_div">
      <h3 style={{ textAlign: "center" }}>Add your Education Details</h3>

      {educationList.map((id) => (
        <EducationItem 
          key={id} 
          form={form} 
          handleNextStep={handleNextStep} 
          educationId={id}  
        />
      ))}

      <div className="delete_add_div">
        <Button
          className="delete_add_btn white_btn"
          disabled={disabled}
          onClick={handleDeleteEducation}
        >
          DELETE
        </Button>
        <Button
          className="delete_add_btn blue_btn"
          onClick={handleAddEducation}
        >
          ADD EDUCATION
        </Button>
      </div>
    </div>
  );
};

export default Education;
