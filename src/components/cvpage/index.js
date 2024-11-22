import { useEffect, useState } from "react";
import { Spin, Flex, Button, Card, List, Typography, Space } from "antd";
import {
  LoadingOutlined,
  GithubOutlined,
  LinkedinOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import { db } from "../../services/firbase";
import { doc, getDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { FIRESTORE_PATH_NAMES } from "../../core/constants/constanst";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./index.css";

const { Title, Paragraph } = Typography;

const CvPage = () => {
  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { uid } = useSelector((state) => state.auth);
  const navigate = useNavigate(); // Use the navigate hook

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

  if (loading) {
    return (
      <Flex align="center" justify="center" style={{ height: "100vh" }}>
        <Spin
          size="large"
          indicator={<LoadingOutlined spin />}
          style={{ color: "#f50057" }}
        />
      </Flex>
    );
  }

  if (!cvData) {
    return <div>No data found!</div>;
  }

  const { profile, education, skills, social } = cvData;
  const { firstName, phoneNumber, lastName, address, email } = profile;

  const educationData = Object.keys(education).reduce((acc, key) => {
    const match = key.match(/_(\d+)$/);
    if (match) {
      const index = match[1];
      if (!acc[index]) {
        acc[index] = {};
      }

      const fieldName = key.replace(`_${index}`, "");
      acc[index][fieldName] = education[key];
    }
    return acc;
  }, []);

  const handleNavigateToMain = () => {
    navigate("/main"); 
  };

  return (
    <div className="cv-container">
      <header className="cv-header">
        <div className="cv-name">
          <Title level={1}>{`${firstName} ${lastName}`}</Title>
        </div>
      </header>

      <section className="cv-section">
        <Title level={2}>Contact Information</Title>
        <Card>
          <List
            bordered
            dataSource={[
              { label: "Email", value: email },
              { label: "Phone", value: phoneNumber },
              { label: "Address", value: address },
            ]}
            renderItem={(item) => (
              <List.Item>
                <strong>{item.label}:</strong> {item.value}
              </List.Item>
            )}
          />
        </Card>
      </section>

      <section className="cv-section">
        <Title level={2}>Skills</Title>
        <Card>
          <List
            size="small"
            dataSource={skills}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </Card>
      </section>

      <section className="cv-section">
        <Title level={2}>Education</Title>
        <Card>
          <List
            itemLayout="vertical"
            dataSource={educationData}
            renderItem={(edu, index) => (
              <List.Item key={index}>
                <Space direction="vertical">
                  <Title level={4}>{edu.courseName}</Title>
                  <Paragraph>
                    <strong>School:</strong> {edu.school}
                  </Paragraph>
                  <Paragraph>
                    <strong>Year of Completion:</strong> {edu.completionYear}
                  </Paragraph>
                  <Paragraph>
                    <strong>Percentage:</strong> {edu.percentage}%
                  </Paragraph>
                </Space>
              </List.Item>
            )}
          />
        </Card>
      </section>

      <section className="cv-section">
        <Title level={2}>Social Media</Title>
        <div className="cv-socials">
          <Space size="middle">
            {social.github && (
              <Button
                type="link"
                icon={
                  <GithubOutlined style={{ fontSize: "2rem", color: "#333" }} />
                }
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
              />
            )}
            {social.linkedin && (
              <Button
                type="link"
                icon={
                  <LinkedinOutlined
                    style={{ fontSize: "2rem", color: "#0077b5" }}
                  />
                }
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              />
            )}
            {social.facebook && (
              <Button
                type="link"
                icon={
                  <FacebookOutlined
                    style={{ fontSize: "2rem", color: "#1877F2" }}
                  />
                }
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
              />
            )}
          </Space>
        </div>
      </section>

      <section className="cv-section">
        <Button
          type="primary"
          onClick={handleNavigateToMain}
        >
          Go to Main Page
        </Button>
      </section>
    </div>
  );
};

export default CvPage;
