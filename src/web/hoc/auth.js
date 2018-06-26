import React from 'react';
import PropTypes from 'prop-types';
import Auth from '../components/Auth';

const withAuth = () => Component => {
  const AuthenticatedComponent = ({ user, onAuth, ...rest }) => {
    return (
      <Auth user={user} onAuth={onAuth}>
        <Component {...rest} />;
      </Auth>
    );
  };
  AuthenticatedComponent.propTypes = {
    user: PropTypes.object,
    onAuth: PropTypes.func.isRequired,
  };
  return AuthenticatedComponent;
};

export default withAuth;
