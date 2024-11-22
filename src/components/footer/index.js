import { notification, Button } from "antd";
import { useState } from "react";
import { db } from "../../services/firbase";
import { setDoc, doc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FIRESTORE_PATH_NAMES } from "../../core/constants/constanst";
import "./index.css";

const Footer = ({ disabled, setCurrent, form, textBtn,disabledContinue}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { uid } = useSelector((state) => state.auth);
  const { profile, education, skills, miniProject, social } = useSelector(
    (state) => state.userInfo
  );
  const handleBackStep = () => {
    setCurrent((prev) => prev - 1);
  };
  const saveUserData = async () => {
    setLoading(true);
    try {
      const userData = {
        profile,
        education,
        skills,
        miniProject,
        social,
      }; 
      const createdDoc = doc(db, FIRESTORE_PATH_NAMES.USER_DATA_INFO, uid);
      await setDoc(createdDoc, userData);
      notification.success({
        message: "Success",
        description: "Your data has been successfully saved",
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Error adding document: " + error.message,
      });
    } finally {
      setLoading(false);
    }
    navigate("/cvpage");
  };

  return (
    <div className="footer_div">
      <button
        className="footer_btn"
        disabled={disabled}
        onClick={handleBackStep}
      >
        BACK
      </button>
      <button className="footer_btn primary" onClick={form.submit}>
        {textBtn}
      </button>
      <Button
        className="footer_btn primary"
        onClick={saveUserData}
        loading={loading}
        style={{ padding:"20px 16px" }}
        disabled={disabledContinue}
      >
        CONTINUE
      </Button>
    
    </div>
  );
};

export default Footer;
