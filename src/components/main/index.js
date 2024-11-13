import { Steps } from "antd";
import Header from "../header";
import { useEffect, useState } from "react";
import Profile from "../../pages/profile";
import Footer from "../footer";
import Education from "../../pages/education";
import Skills from "../../pages/skills";
import MiniProject from "../../pages/miniProject";
import Social from "../../pages/social";
import "./index.css";
const Main = () => {
  const [current, setCurrent] = useState(0);
  const [disabled,setDisabled] = useState(true)
  const onChange = (value) => {
   
    setCurrent(value);
  };

  useEffect(()=>{
    if(current === 0){
      setDisabled(true)
    }
    else {
      setDisabled(false)

    }
  },[current])
  return (
    <div>
      <Header />
      <Steps
        style={{
          marginTop: 30,
        }}
        current={current}
        onChange={onChange}
        size="small"
        items={[
          {
            title: "Profile Section",
          },
          {
            title: "Education Section",
          },
          {
            title: "Skills Sector",
          },
          {
            title: "Mini Project",
          },
          {
            title: "Social",
          },
        ]}
      />
      {current === 0 && <Profile/>}
      {current === 1 && <Education/>}
      {current === 2 && <Skills/>}
      {current === 3 && <MiniProject/>}
      {current === 4 && <Social/>}




      <hr />
      <Footer disabled={disabled} setCurrent={setCurrent}/>
    </div>
  );
};

export default Main;
