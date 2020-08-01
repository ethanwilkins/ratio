import React, { Component } from 'react';
import PropTypes from 'prop-types';

import mobile from 'is-mobile';

import styles from '../styles/SettingsInput.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class SettingsInput extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }
  
  focusInput = () => {
    this.input.current.focus();
  };

  render() {
    const {
      input,
      handleInputChange,
      handleFormSubmit,
      inputType
    } = this.props;

    return (
      <div onClick={this.focusInput} className={styles.button}>
        {mobile() &&
          <form
            className={styles.form}
            noValidate
            autoComplete="off"
            onSubmit={handleFormSubmit}
          >
            <input
              ref={this.input}
              className={styles.input}
              type="text" value={input}
              onChange={handleInputChange}
            />
          </form>
        }
        {!mobile() &&
          <input
            ref={this.input}
            className={styles.input}
            style={{width: input.toString().length + 'ch', left: `calc(50% - ${input.toString().length * 0.4}ch)`}}
            type="text" value={input}
            onKeyDown={handleInputChange}
            onChange={handleInputChange}
          />
        }
      </div>
    )
  }
}

SettingsInput.propTypes = {
  input: PropTypes.number.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  inputType: PropTypes.string.isRequired
};

export default SettingsInput;
