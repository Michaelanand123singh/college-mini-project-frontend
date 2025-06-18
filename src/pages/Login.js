import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <LoginForm />
      <div className="text-center mt-4">
        <p>Don't have an account? <Link to="/register" className="text-blue-600">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;