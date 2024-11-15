import React from 'react';
import { Form, Input, Button, notification, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Link } = Typography;

const LoginForm = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Login data:', values);

    notification.success({
      message: 'Login Successful',
      description: 'You have logged in successfully!',
    });

    navigate('/main');
  };

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
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: '100%',
                backgroundColor: '#f50057', // Custom button color
                borderColor: '#f50057', // Ensures border matches button color
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
