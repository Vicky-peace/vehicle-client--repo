import React, { useState } from 'react';
import LoginForm from './login/Login';
import RegisterForm from './register/Register';
import './auth.scss';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchToLogin = () => setIsLogin(true);
  const switchToRegister = () => setIsLogin(false);

  return (
    <div className="auth-container">
      <h1>CarHaven.io</h1>
      {isLogin ? (
        <LoginForm switchToRegister={switchToRegister} />
      ) : (
        <RegisterForm switchToLogin={switchToLogin} />
      )}
    </div>
  );
};

export default AuthPage;
