import React from 'react';
import PropTypes from 'prop-types';

function Button({ children, dataTestid, disabled, onClick }) {
  return (
    <button
      type="button"
      data-testid={ dataTestid }
      disabled={ disabled }
      onClick={ onClick }
    >
      { children }
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  dataTestid: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
