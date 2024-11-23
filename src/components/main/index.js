import { Steps, Form   } from "antd";
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
import { ROUTE_CONSTANTS } from "../../core/constants/constanst";
import "./index.css";

const steps = [
  { title: "Profile Section", component: Profile, action: setProfile },
  { title: "Education Section", component: Education, action: setEducation },
  { title: "Skills Sector", component: Skills, action: setSkills },
  { title: "Mini Project", component: MiniProject, action: setMiniProject },
  { title: "Social", component: Social, action: setSocial },
];

const Main = () => {
  const [current, setCurrent] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [disabledContinue, setDisabledContinue] = useState(false);
  const [textBtn,setTextBtn] = useState("NEXT")
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
      navigate(ROUTE_CONSTANTS.LOGIN);
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

  const handleNextStep = (value) => {
    const currentStep = steps[current];
    dispatch(currentStep.action(currentStep.action === setSkills ? Object.values(value) : value));
    if (current < steps.length - 1) {
      setCurrent(prev => prev + 1);
      updateStepInURL(current + 1);
    }
    form.resetFields();
  };

  useEffect(() => {
    setDisabled(current === 0);
    if(current >= 4){
      setTextBtn("SAVE")
      setDisabledContinue(false)
    }else{
      setTextBtn("NEXT")
      setDisabledContinue(true)
    }
  }, [current]);

  const CurrentComponent = steps[current]?.component;

  return (
    <div className="main_div">
      <Header />
      <Steps
        style={{ marginTop: 30 }}
        current={current}
        onChange={onChange}
        size="small"
        items={steps.map(step => ({ title: step.title }))}
      />
      {CurrentComponent && (
        <CurrentComponent
          form={form}
          handleNextStep={handleNextStep}
        />
      )}
      <hr />
      <Footer disabled={disabled} setCurrent={setCurrent} form={form} textBtn={textBtn} disabledContinue = {disabledContinue}/>
    </div>
  );
};

export default Main;
