import { useState,useEffect } from "react";
import MiniProjectItem from "../miniProjectItem/indexs";
const MiniProject = () => {
    const [disabled,setDisabled] = useState(true)
    const [miniProjectList,setMiniProjectList] = useState([<MiniProjectItem key={0}/>])
    const handleAddProject = ({timeStamp})=>{
        setMiniProjectList([...miniProjectList,<MiniProjectItem  key={timeStamp}/>])
    }
    const handleDeleteProject = ()=>{
        miniProjectList.pop()
        setMiniProjectList([...miniProjectList])
      }
    useEffect(()=>{
        if(miniProjectList.length > 1){
          setDisabled(false)
        }
        else{
          setDisabled(true)     
        }
      },[miniProjectList])
  return (
    <div className="main_form_div">
      <h3 style={{ textAlign: "center" }}>Add your Mini Projects
      </h3>
        {miniProjectList.map((project) => project)}   

      <div className="delete_add_div">
        <button
          className="delete_add_btn white_btn"
          disabled={disabled}
          onClick={handleDeleteProject}
        >
          DELETE
        </button>
        <button
          className="delete_add_btn blue_btn"
          onClick={handleAddProject}
        >
          {" "}
          ADD PROJECT
        </button>
      </div>
    </div>
  );
};

export default MiniProject;
