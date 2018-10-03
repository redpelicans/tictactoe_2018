import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, InputGroup } from 'react-bootstrap';
import './widgets.css';

export const Icon = ({ fruit }) => (
  <div className="title-icon">
    <i className={`fa fa-${fruit.icon}`} />
  </div>
);

Icon.propTypes = {
  fruit: PropTypes.object.isRequired,
};

export const Title = ({ name }) => (
  <div className="title">
    <span>{name}</span>
  </div>
);

Title.propTypes = {
  name: PropTypes.string.isRequired,
};

export const BeforeInput = ({ glyph }) => (
  <InputGroup.Addon>
    <Glyphicon glyph={glyph} />
  </InputGroup.Addon>
);

BeforeInput.propTypes = {
  glyph: PropTypes.string.isRequired,
};
