import React from 'react';
import PropTypes from 'prop-types';
import '../css/Button.css';

function Button({ children, dataTestid, disabled, onClick, className }) {
  return (
    <button
      type="button"
      data-testid={ dataTestid }
      disabled={ disabled }
      onClick={ onClick }
      className={ className }
    >
      { children }
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  dataTestid: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

Button.defaultProps = {
  disabled: false,
};

export default Button;
