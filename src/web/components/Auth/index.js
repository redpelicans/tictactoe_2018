import React from 'react';
import { object, func, array } from 'prop-types';
import LoginForm from '../LoginForm';

const Auth = ({ user, onAuth, children }) => {
  if (user) return children;
  return <LoginForm onAuth={onAuth} />;
};

Auth.propTypes = {
  user: object,
  onAuth: func.isRequired,
  children: array,
};

export default Auth;
