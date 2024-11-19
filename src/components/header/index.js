import React, { useState,useEffect } from "react";
import { Button,Spin,Flex } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../../state-managment/slice/authSlice";
import { useSelector } from "react-redux";
import { FIRESTORE_PATH_NAMES } from "../../core/constants/constanst";
import { db } from "../../services/firbase";
import { doc, getDoc } from "firebase/firestore";
import { LoadingOutlined } from "@ant-design/icons";

import "./index.css"; 
const Header = () => {
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false)
  const [ name,setName ] = useState("")
  const handleLogout = () => {
    dispatch(logout()); 
  };

  const { uid } = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const cvDocRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid);
        const docSnapshot = await getDoc(cvDocRef);
        if (docSnapshot.exists()) {
          const {name} = docSnapshot.data()
          setName(name);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [uid]);
  if (loading) {
    return (
      <Flex align="center" justify="center" style={{height:"100vh"}}>
        <Spin size="large" indicator={<LoadingOutlined spin />} style={{color:"#f50057"}}/>
      </Flex>
    );
  }

  return (
    <div className="header">
      <h2>RESUME GENERATOR</h2>
      <h2 className="h2_name">{name}</h2>
      <Button className="logout-btn" onClick={handleLogout} >
        Log Out
      </Button>
    </div>
  );
};

export default Header;
