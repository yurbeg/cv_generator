import React, { useState } from 'react';
import { Form, Input, Button, notification, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { auth,db} from '../../services/firbase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { FIRESTORE_PATH_NAMES } from '../../core/constants/constanst';
const { Link } = Typography;

const RegisterForm = () => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)

  const onFinish = async (values) => {
    setLoading(true);
    const { name, email, password } = values;
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const { uid } = response.user;
      const createdDoc = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid);
      await setDoc(createdDoc, {
        uid, name, email
      });
      notification.success({
        message: 'Registration Successful',
        description: 'You have registered successfully!',
      });
      navigate('/login');

    }catch (e) {
      console.log(e);
    } finally {
      setLoading(false)
    }
   

  
  };


  return (
    <div className="form-container">
      <div className="form-content">
        <h2>Register</h2>
        <Form
          name="register_form"
          onFinish={onFinish}
          style={{ width: '100%' }}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your full name!',
              },
            ]}
          >
            <Input placeholder="Full Name" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                min: 6,
                message: 'Password must be at least 6 characters!',
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{
                width: '100%',
                backgroundColor: '#f50057',
                borderColor: '#f50057', 
              }}
            >
              Register
            </Button>
          </Form.Item>

          <Form.Item style={{ textAlign: 'center' }}>
            <Typography.Text>Already have an account? </Typography.Text>
            <Link href="/login">Login</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
