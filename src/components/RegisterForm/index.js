import React from 'react';
import { Form, Input, Button, notification, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Link } = Typography;

const RegisterForm = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Registration data:', values);

    notification.success({
      message: 'Registration Successful',
      description: 'You have registered successfully!',
    });

    navigate('/login');
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
              style={{
                width: '100%',
                backgroundColor: '#f50057', // Custom button color
                borderColor: '#f50057', // Ensures border matches button color
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
