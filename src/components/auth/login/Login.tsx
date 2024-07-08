import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../../sevices/rtk-api/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../sevices/slices/authSlice';
import { toast } from 'react-toastify';

import './login.scss';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

interface LoginFormProps {
  switchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ switchToRegister }) => {
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const userData = await login(values).unwrap();
      dispatch(setUser(userData));
      toast.success('Login successful!');
      navigate('/');
    } catch (error: any) {
      const errorMessage = error.data?.error || 'Login failed. Invalid Credentials. Please try again.';
      toast.error(errorMessage);
        }
  
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
