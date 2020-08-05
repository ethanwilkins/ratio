import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/SettingsInput.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class SettingsInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      submitted: false
    };
    this.input = React.createRef();
  }
  
  handleClick = () => {
    this.setState(state => ({ focused: true }), () => {
      // programmatically sets focus on input for this SettingsInput
      this.input.current.focus();
    });
  };
  
  handleFormSubmit = (event) => {
    event.preventDefault();
    // calls handleFormSubmit passed originally from Main.js first
    this.props.handleFormSubmit();
    // sets state for submit animation
    this.setState({
      submitted: true
    });
  };
  
  handleTransitionEnd = () => {
    this.setState({
      submitted: false
    });
  };

  handleBlur = () => {
    this.setState({
      focused: false
    });
    this.props.toggleCurrentlyInputtingText();
  };

  render() {
    let {
      input,
      handleInputChange,
      inputType,
      toggleCurrentlyInputtingText
    } = this.props;
    
    const {
      focused,
      submitted
    } = this.state;

    return (
      <div
        onClick={this.handleClick}
        onMouseDown={toggleCurrentlyInputtingText}
        onTouchStart={toggleCurrentlyInputtingText}
        className={cx(styles.button, {
          submitted: submitted
        })}
        onTransitionEnd={this.handleTransitionEnd}
      >
        {inputType === 'lineHeight' && !focused &&
          <div
            className={styles.lineHeightText}
            style={{width: input.toString().length + 'ch', left: `calc(50% - ${input.toString().length * 0.4}ch)`}}
          >
            {input}%
          </div>
        }
        {(inputType !== 'lineHeight' || (inputType === 'lineHeight' && focused)) &&
          <form
            className={styles.form}
            noValidate
            autoComplete="off"
            onSubmit={this.handleFormSubmit}
          >
            <input
              ref={this.input}
              type="text" value={input}
              onChange={handleInputChange}
              onBlur={this.handleBlur}
              className={cx(styles.input, {
                submitted: submitted
              })}
              style={{width: input.toString().length + 'ch', left: `calc(50% - ${input.toString().length * 0.4}ch)`}}
            />
          </form>
        }
      </div>
    )
  }
}

SettingsInput.propTypes = {
  input: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  inputType: PropTypes.string.isRequired,
  toggleCurrentlyInputtingText: PropTypes.func.isRequired
};

export default SettingsInput;
