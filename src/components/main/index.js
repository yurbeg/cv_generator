import { Steps, Form } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';  // Импортируем useSelector для проверки авторизации
import Header from "../header";
import Profile from "../../pages/profile";
import Footer from "../footer";
import Education from "../../pages/education";
import Skills from "../../pages/skills";
import MiniProject from "../../pages/miniProject";
import Social from "../../pages/social";
import { userInfoData } from "../../core/constants/constanst";
import "./index.css";

const Main = () => {
  const [current, setCurrent] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); 


  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const onChange = (value) => {
    setCurrent(value);
  };

  const handleNextStep = (value, cur) => {
    if (cur === 0) {
      userInfoData.profile = value;
    } else if (cur === 1) { 
      userInfoData.education = value;
    } else if (cur === 2) {
      userInfoData.skills = Object.values(value);
    } else if (cur === 3) {
      userInfoData.miniProject = value;
    } else if (cur === 4) {
      userInfoData.social = value;
    }
    
    if (current >= 0 && current < 4) {
      setCurrent((prev) => prev + 1);
    }
    form.resetFields();
  };

  useEffect(() => {
    if (current === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [current]);

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
          { title: "Profile Section" },
          { title: "Education Section" },
          { title: "Skills Sector" },
          { title: "Mini Project" },
          { title: "Social" },
        ]}
      />
      {current === 0 && <Profile form={form} handleNextStep={(value) => handleNextStep(value, current)} />}
      {current === 1 && <Education form={form} handleNextStep={(value) => handleNextStep(value, current)} />}
      {current === 2 && <Skills form={form} handleNextStep={(value) => handleNextStep(value, current)} />}
      {current === 3 && <MiniProject form={form} handleNextStep={(value) => handleNextStep(value, current)} />}
      {current === 4 && <Social form={form} handleNextStep={(value) => handleNextStep(value, current)} />}

      <hr />
      <Footer disabled={disabled} setCurrent={setCurrent} form={form} />
    </div>
  );
};

export default Main;