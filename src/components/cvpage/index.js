import React, { useEffect, useState, useRef } from 'react';
import { Button, Card, Col, Row, Typography, Avatar, List, Divider } from 'antd';
import { GithubOutlined, LinkedinOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { db } from '../../services/firbase'; 
import { doc,getDoc } from 'firebase/firestore';
import { jsPDF } from "jspdf";
import { useSelector } from 'react-redux';  
import { FIRESTORE_PATH_NAMES } from '../../core/constants/constanst';
import './index.css';

const { Title, Paragraph } = Typography;

const CvPage = () => {
  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { uid } = useSelector((state) => state.auth);
  const cvRef = useRef();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cvDocRef = doc(db, FIRESTORE_PATH_NAMES.USER_DATA_INFO, uid); 
        const docSnapshot = await getDoc(cvDocRef);
        if (docSnapshot.exists()) {
          setCvData(docSnapshot.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();

   
    doc.html(cvRef.current, {
      callback: function (doc) {
        doc.save("cv.pdf"); 
      },
      margin: [10, 10, 10, 10], 
      x: 10,
      y: 10,
    });
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!cvData) {
    return <div>No data found!</div>;
  }
  
  
  const { profile, education, miniProject, skills, social } = cvData;
  
  console.log(cvData);
  return (
    <div className="cv-container">
      <div ref={cvRef}>
        <Row gutter={32} justify="center">
          <Col xs={24} sm={8}>
            <Card bordered={false} className="profile-card">
              <Avatar size={128} src={profile.imageUrl} className="profile-avatar" />
              <Title level={2} className="cv-title">{`${profile.firstName} ${profile.lastName}`}</Title>
              <Paragraph><PhoneOutlined /> {profile.phoneNumber}</Paragraph>
              <Paragraph><MailOutlined /> {profile.email}</Paragraph>
              <Paragraph>{profile.address}</Paragraph>

              <Divider />

              <Title level={4} className="cv-subtitle">Skills</Title>
              <List
                size="small"
                bordered
                dataSource={skills}
                renderItem={item => <List.Item>{item}</List.Item>}
              />

              <Divider />

              {/* <Button
                type="link"
                icon={<GithubOutlined />}
                href={social.github}
                target="_blank"
                style={{ width: '100%', marginBottom: '8px' }}
                className="cv-btn"
              >
                GitHub
              </Button>
              <Button
                type="link"
                icon={<LinkedinOutlined />}
                href={social.linkedin}
                target="_blank"
                style={{ width: '100%' }}
                className="cv-btn"
              >
                LinkedIn
              </Button> */}
            </Card>
          </Col>

          <Col xs={24} sm={16}>
            <Card title="Education" bordered={false} className="cv-section">
              <p><strong>{education["college/school0"]}</strong> {education.courseName0}</p>
              <p><strong>Year of Completion:</strong> {education.completionYear0}</p>
              <p><strong>Percentage:</strong> {education.percentage0}%</p>
            </Card>

            <Card title="Mini Projects" bordered={false} className="cv-section">
              <p><strong>{miniProject.projectName0}</strong></p>
              <p><strong>Tech Stack:</strong> {miniProject.techStack0}</p>
              <p>{miniProject.description0}</p>
            </Card>

          </Col>
        </Row>
      </div>

      <Button 
        type="primary" 
        icon={<i className="fas fa-download"></i>} 
        onClick={downloadPDF}
        style={{ marginTop: '20px' }}
      >
        Download CV as PDF
      </Button>
    </div>
  );
};

export default CvPage;