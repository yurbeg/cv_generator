import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  Col,
  Row,
  Typography,
  Avatar,
  List,
  Divider,
  Spin,
  Flex,
} from "antd";
import { PhoneOutlined, MailOutlined,LoadingOutlined } from "@ant-design/icons";
import { db } from "../../services/firbase";
import { doc, getDoc } from "firebase/firestore";
// import { jsPDF } from "jspdf";
import { useSelector } from "react-redux";
import { FIRESTORE_PATH_NAMES } from "../../core/constants/constanst";
import "./index.css";

const { Title, Paragraph } = Typography;

const CvPage = () => {
  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { uid } = useSelector((state) => state.auth);
  const cvRef = useRef();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const cvDocRef = doc(db, FIRESTORE_PATH_NAMES.USER_DATA_INFO, uid);
        const docSnapshot = await getDoc(cvDocRef);
        if (docSnapshot.exists()) {
          setCvData(docSnapshot.data());
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

  // const downloadPDF = () => {
  //   const doc = new jsPDF();
  //   doc.html(cvRef.current, {
  //     callback: function (doc) {
  //       doc.save("cv.pdf");
  //     },
  //     margin: [10, 10, 10, 10],
  //     x: 10,
  //     y: 10,
  //   });
  // };

  if (loading) {
    return (
      <Flex align="center" justify="center" style={{height:"100vh"}}>
        <Spin size="large" indicator={<LoadingOutlined spin />} style={{color:"#f50057"}}/>
      </Flex>
    );
  }

  if (!cvData) {
    return <div>No data found!</div>;
  }
  const { profile, education, miniProject, skills } = cvData;
  const educationArray = Object.keys(education).reduce((acc, key) => {
    const match = key.match(/\d+/);
    if (match) {
      const index = match[0];
      if (!acc[index]) acc[index] = {};
      const propertyName = key.replace(/\d+$/, "");
      acc[index][propertyName] = education[key];
    }

    return acc;
  }, []);
  return (
    <div className="cv-container">
      <div ref={cvRef}>
        <Row gutter={32} justify="center">
          <Col xs={24} sm={8}>
            <Card bordered={false} className="profile-card">
              <Avatar
                size={128}
                src={profile.imageUrl}
                className="profile-avatar"
              />
              <Title
                level={2}
                className="cv-title"
              >{`${profile.firstName} ${profile.lastName}`}</Title>
              <Paragraph>
                <PhoneOutlined /> {profile.phoneNumber}
              </Paragraph>
              <Paragraph>
                <MailOutlined /> {profile.email}
              </Paragraph>
              <Paragraph>{profile.address}</Paragraph>

              <Divider />

              <Title level={4} className="cv-subtitle">
                Skills
              </Title>
              <List
                size="small"
                bordered
                dataSource={skills}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />

              <Divider />
            </Card>
          </Col>

          <Col xs={24} sm={16}>
            {educationArray.map((edu, index) => (
              <Card
                title="Education"
                bordered={false}
                className="cv-section"
                key={index}
              >
                <p>
                  <strong>College/school</strong> {edu["college/school"]}
                </p>

                <p>
                  <strong>Course Name</strong> {edu.courseName}
                </p>
                <p>
                  <strong>Year of Completion:</strong> {edu.completionYear}
                </p>
                <p>
                  <strong>Percentage:</strong> {edu.percentage}%
                </p>
              </Card>
            ))}

            <Card title="Mini Projects" bordered={false} className="cv-section">
              <p>
                <strong>Project Name</strong> {miniProject.projectName0}
              </p>
              <p>
                <strong>Tech Stack:</strong> {miniProject.techStack0}
              </p>
              <p>
                <strong>Description: </strong> {miniProject.description0}
              </p>
            </Card>
          </Col>
        </Row>
      </div>

      
      {/* <Button
        type="primary"
        icon={<i className="fas fa-download"></i>}
        onClick={downloadPDF}
        style={{ marginTop: "20px" }}
      >
        Download CV as PDF
      </Button> */}
    </div>
  );
};

export default CvPage;
