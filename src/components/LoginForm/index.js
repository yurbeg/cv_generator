import React, { useState,useEffect } from 'react';
import { Form, Input, Button, notification, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../services/firbase';  
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';  
import { login } from '../../state-managment/slice'; 
import { setUid } from '../../state-managment/slice';

const { Link } = Typography;

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();  
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { email, password,} = values;
      await signInWithEmailAndPassword(auth, email, password);
      
      
        notification.success({
          message: 'Login Successful',
          description: 'You have logged in successfully!',
        });
        dispatch(login());  
        navigate('/main');  
    } catch (error) {
      notification.error({
        message: 'Login Error',
        description: 'There was an error logging you in.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(setUid(user.uid));
      } else {
        dispatch(setUid(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
  return (
    <div className="form-container">
      <div className="form-content">
        <h2>Login</h2>
        <Form
          name="login_form"
          onFinish={onFinish}
          initialValues={{
            remember: true,
          }}
          style={{ width: '100%' }}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
              {
                type: 'email',
                message: 'The input is not a valid E-mail!',
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
            ]}
          >
            <Input.Password placeholder="Password" />
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
              Log in
            </Button>
          </Form.Item>

          <Form.Item style={{ textAlign: 'center' }}>
            <Typography.Text>Don't have an account? </Typography.Text>
            <Link href="/register">Register</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
