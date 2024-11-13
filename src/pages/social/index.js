import { Form} from "antd";
import SocialItem from "../socialItem";
import { useState,useEffect } from "react";
const Social = () => {
  const [form] = Form.useForm();
  const [disabled,setDisabled] = useState(true)
  const [socialList,setSocialList] = useState([<SocialItem key={0}/>])
  const handleAddSocial = ({timeStamp}) => {   
    setSocialList([...socialList,<SocialItem  key={timeStamp}/>])
  };
  const handleDeleteSocial = ()=>{
    socialList.pop()
    setSocialList([...socialList])
  }
  useEffect(()=>{
    if(socialList.length > 1){
      setDisabled(false)
    }
    else{
      setDisabled(true)

    }
  },[socialList])
  return (
    <div className="main_form_div">
      <h3 style={{ textAlign: "center" }}>
        Add social links like linkedin , github etc
      </h3>
        <Form form={form}>
            {socialList.map(social=>social)}    
        </Form>
      <div className="delete_add_div">
        <button
          className="delete_add_btn white_btn"
          disabled={disabled}
          onClick={handleDeleteSocial}
        >
          DELETE SOCIAL
        </button>
        <button
          className="delete_add_btn blue_btn"
          onClick={handleAddSocial}
        >
          {" "}
          ADD SOCIAL
        </button>
      </div>
    </div>
  );
};
export default Social;
