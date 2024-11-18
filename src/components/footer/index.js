import { userInfoData,FIRESTORE_PATH_NAMES } from "../../core/constants/constanst";
import { notification, Button } from "antd";
import { useState } from "react";
import { db } from "../../services/firbase";
import { setDoc, doc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./index.css";
const Footer = ({ disabled, setCurrent, form }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const { uid } = useSelector((state) => state.auth);
  const handleBackStep = () => {
    setCurrent((prev) => prev - 1);
  };

  const saveUserData = async () => {
    setLoading(true);

    try {
      const createdDoc = doc(db, FIRESTORE_PATH_NAMES.USER_DATA_INFO, uid);
      await setDoc(createdDoc, userInfoData);
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setLoading(false);
    }
    navigate("/cvpage") 
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
        NEXT
      </button>
      <Button className="footer_btn primary" onClick={saveUserData} loading={loading}>
        SAVE AND COUNTINUE
      </Button>
    </div>
  );
};
export default Footer;
