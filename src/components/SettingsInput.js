import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/SettingsInput.module.scss';

class SettingsInput extends Component {
  constructor(props) {
    super(props);
    this.state = { focused: false };
    this.input = React.createRef();
  }
  
  handleClick = () => {
    this.setState(state => ({ focused: true }), () => {
      // programmatically sets focus on input for this SettingsInput
      this.input.current.focus();
    });
  };
  
  handleKeyDown = (event) => {
    // blurs input when user hits enter
    if ([13].includes(event.keyCode)) {
      this.setState({
        focused: false
      });
    }
  };

  handleBlur = () => {
    this.setState({
      focused: false
    });
  };

  render() {
    const {
      input,
      handleInputChange,
      handleFormSubmit,
      inputType
    } = this.props;
    
    const { focused } = this.state;

    return (
      <div onClick={this.handleClick} className={styles.button}>
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
            onSubmit={handleFormSubmit}
          >
            <input
              ref={this.input}
              className={styles.input}
              style={{width: input.toString().length + 'ch', left: `calc(50% - ${input.toString().length * 0.4}ch)`}}
              type="text" value={input}
              onChange={handleInputChange}
              onKeyDown={this.handleKeyDown}
              onBlur={this.handleBlur}
            />
          </form>
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
