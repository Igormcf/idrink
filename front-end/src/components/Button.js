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
  children: PropTypes.node.isRequired,
  dataTestid: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  disabled: false,
};

export default Button;
