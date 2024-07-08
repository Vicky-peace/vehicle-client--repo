import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './login.scss';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

interface LoginFormProps {
  switchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ switchToRegister }) => {
  const navigate = useNavigate();

  const handleLogin = (values: { email: string; password: string }) => {
    // Logic for login
    // If login is successful, redirect to the dashboard
    navigate('/');
  };

  return (
    <div className="login-form">
      <h2 className='text-center font-bold'>Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" className="error" />
            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" className="error" />
            <button type="submit" disabled={isSubmitting}>Login</button>
          </Form>
        )}
      </Formik>
      <p className="text-center mt-5 text-sm text-gray-600">
  Not a member? <span onClick={switchToRegister} className="text-blue-700 cursor-pointer font-bold">Register</span>
</p>

    </div>
  );
};

export default LoginForm;
