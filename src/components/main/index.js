import { Steps, Form } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setProfile, setEducation, setSkills, setMiniProject, setSocial } from '../../state-managment/slice/userInfoSlice'; // импортируем действия
import Header from "../header";
import Profile from "../../pages/profile";
import Footer from "../footer";
import Education from "../../pages/education";
import Skills from "../../pages/skills";
import MiniProject from "../../pages/miniProject";
import Social from "../../pages/social";
import "./index.css";

const Main = () => {
  const [current, setCurrent] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();  
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);   
  const dispatch = useDispatch(); 

  const updateStepInURL = (step) => {
    navigate(`?step=${step}`, { replace: true });
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const stepFromURL = urlParams.get('step');
    if (stepFromURL) {
      setCurrent(Number(stepFromURL)); 
    }
  }, [location.search]);

  const onChange = (value) => {
    setCurrent(value);
    updateStepInURL(value);  
  };

  const handleNextStep = (value, cur) => {
    if (cur === 0) {
      dispatch(setProfile(value)); 
    } else if (cur === 1) { 
      dispatch(setEducation(value)); 
    } else if (cur === 2) {
      dispatch(setSkills(Object.values(value))); 
    } else if (cur === 3) {
      dispatch(setMiniProject(value));
    } else if (cur === 4) {
      dispatch(setSocial(value)); 
    }
    
    if (current >= 0 && current < 4) {
      setCurrent((prev) => prev + 1);
      updateStepInURL(current + 1); 
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
    <div className="main_div">
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
