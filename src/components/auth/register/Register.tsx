import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../sevices/slices/authSlice';
import './register.scss';
import { toast } from 'react-toastify';
import { api } from '../../../sevices/rtk-api/auth';
import { ClipLoader } from 'react-spinners';

const registerSchema = Yup.object().shape({
  full_name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  contact_phone: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

interface RegisterFormProps {
  switchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ switchToLogin }) => {
  const dispatch = useDispatch();
  const [register] = api.useRegisterMutation();
  const handleRegister = async (values: { full_name: string; email: string; contact_phone: string; address: string; password: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      const userData = await register(values).unwrap();
      dispatch(setUser(userData));
      toast.success('Registration successful!');
      switchToLogin();
    } catch (error : any) {
      const errorMessage = error.data?.error || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    } finally{
      setSubmitting(false);
    }
   
  };

  return (
    <div className="register-form">
      <h2 className='text-center font-bold'>Register</h2>
      <Formik
        initialValues={{ full_name: '', email: '', contact_phone: '', address: '', password: '' }}
        validationSchema={registerSchema}
        onSubmit={handleRegister}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="full_name" placeholder="Full Name" />
            <ErrorMessage name="fullName" component="div" className="error" />
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" className="error" />
            <Field type="text" name="contact_phone" placeholder="Contact Phone" />
            <ErrorMessage name="contactPhone" component="div" className="error" />
            <Field type="text" name="address" placeholder="Address" />
            <ErrorMessage name="address" component="div" className="error" />
            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" className="error" />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <ClipLoader size={20} color="white" />
                  <span className="ml-2">Registering...</span>
                </div>
              ) : (
                'Register'
              )}
            </button>
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
