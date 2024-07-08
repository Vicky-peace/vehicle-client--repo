import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './register.scss';

const registerSchema = Yup.object().shape({
  fullName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  contactPhone: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

interface RegisterFormProps {
  switchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ switchToLogin }) => {
  const handleRegister = (values: { fullName: string; email: string; contactPhone: string; address: string; password: string }) => {
    // Logic for registration
    // If registration is successful, switch to login view
    switchToLogin();
  };

  return (
    <div className="register-form">
      <h2 className='text-center font-bold'>Register</h2>
      <Formik
        initialValues={{ fullName: '', email: '', contactPhone: '', address: '', password: '' }}
        validationSchema={registerSchema}
        onSubmit={handleRegister}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="fullName" placeholder="Full Name" />
            <ErrorMessage name="fullName" component="div" className="error" />
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" className="error" />
            <Field type="text" name="contactPhone" placeholder="Contact Phone" />
            <ErrorMessage name="contactPhone" component="div" className="error" />
            <Field type="text" name="address" placeholder="Address" />
            <ErrorMessage name="address" component="div" className="error" />
            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" className="error" />
            <button type="submit" disabled={isSubmitting}>Register</button>
          </Form>
        )}
      </Formik>
      <p className="text-center mt-5 text-base text-gray-600">
  Not a member? <span onClick={switchToLogin} className="text-blue-700 cursor-pointer underline font-bold">Login</span>
</p>
    </div>
  );
};

export default RegisterForm;
