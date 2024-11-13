import { useEffect, useState } from "react";
import EducationItem from "../education_item";
import "./index.css";
const Education = () => {
  const [disabled,setDisabled] = useState(true)
  const [educationList,setEducationList] = useState([<EducationItem key={0}/>])
  const handleAddEducation = ({timeStamp}) => {   
    setEducationList([...educationList,<EducationItem  key={timeStamp}/>])
  };
  const handleDeleteEducation = ()=>{
    educationList.pop()
    setEducationList([...educationList])
  }
  useEffect(()=>{
    if(educationList.length > 1){
      setDisabled(false)
    }
    else{
      setDisabled(true)

    }
  },[educationList])
  return (
    <div className="main_form_div">
      <h3 style={{ textAlign: "center" }}>Add your Education Details</h3>
      {
        educationList.map((education)=>education)
      }

      <div className="delete_add_div">
        <button className="delete_add_btn white_btn" disabled={disabled}
        onClick={handleDeleteEducation}>
          DELETE
        </button>
        <button className="delete_add_btn blue_btn" onClick={handleAddEducation}> ADD EDUCATION</button>
      </div>
    </div>
  );
};
export default Education;
