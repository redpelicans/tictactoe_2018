import React from 'react';
import PropTypes from 'prop-types';
import './widgets.css';

export const Icon = ({ type }) => (
  <div className="title-icon">
    <i className={`fa fa-${type}`} />
  </div>
);

Icon.propTypes = {
  type: PropTypes.string.isRequired,
};

export const Title = ({ name }) => (
  <div className="title">
    <span>{name}</span>
  </div>
);

Title.propTypes = {
  name: PropTypes.string.isRequired,
};
