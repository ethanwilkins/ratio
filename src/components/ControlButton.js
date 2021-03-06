import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isAndroid } from 'react-device-detect';

import styles from '../styles/ControlButton.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class ControlButton extends Component {
  state = {
    pressed: false
  }
  
  togglePressed = () => {
    const { pressed } = this.state;
    this.setState({
      pressed: !pressed
    });
  };
  
  handleTouchStart = () => {
    this.togglePressed();
    // haptic feedback for android
    if (isAndroid) {
      window.navigator.vibrate(1);
    }
  };
  
  render() {
    const { pressed } = this.state;
    
    const {
      text,
      activeControl,
      controlType,
      setActiveControl,
      reset
    } = this.props;
    
    return (
      <div
        onMouseDown={this.togglePressed}
        onMouseUp={this.togglePressed}
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.togglePressed}
        onClick={reset ? reset : () => setActiveControl(controlType)}
        className={cx(styles.controlButton, {
          activeButton: (activeControl && activeControl === controlType) || (reset && pressed)
        })}
      >
        <div className={controlType === 'lineHeight' ? styles.lineHeightButtonText : styles.buttonText}>
          {text}
        </div>
      </div>
    )
  }
}

ControlButton.propTypes = {
  text: PropTypes.string.isRequired,
  activeControl: PropTypes.string,
  controlType: PropTypes.string,
  setActiveControl: PropTypes.func,
  reset: PropTypes.func
};

export default ControlButton;
