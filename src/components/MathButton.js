import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isAndroid } from 'react-device-detect';

import styles from '../styles/MathButton.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class MathButton extends Component {
  state = {
    pressed: false,
    longPressed: false
  }
  
  componentDidMount() {
    const { changeField, changeDirection } = this.props;
    this.callChangeFieldInterval = setInterval(() => {
      const { longPressed } = this.state;
      // temporarily disabled until bug fix
      if (false && longPressed) {
        changeField(changeDirection);
      }
    }, 125);
  }
  
  componentWillUnmount() {
    clearInterval(this.callChangeFieldInterval);
  }
  
  handleButtonPress = () => {
    this.togglePressed();
    this.buttonPressTimer = setTimeout(() => {
      this.toggleLongPressed();
    }, 500);
    // haptic feedback for android
    if (isAndroid) {
      window.navigator.vibrate(1);
    }
  };
  
  handleButtonRelease = () => {
    this.togglePressed();
    this.toggleLongPressed();
    clearTimeout(this.buttonPressTimer);
  };
  
  togglePressed = () => {
    const { pressed } = this.state;
    this.setState({
      pressed: !pressed
    });
  };
  
  toggleLongPressed = () => {
    const { longPressed } = this.state;
    this.setState({
      longPressed: !longPressed
    });
  };
  
  render() {
    const { pressed } = this.state;
    
    const {
      text,
      changeField,
      changeDirection,
      hideForIphone8
    } = this.props;
    
    return (
      <div
        onMouseDown={this.handleButtonPress}
        onMouseUp={this.handleButtonRelease}
        onTouchStart={this.handleButtonPress}
        onTouchEnd={this.handleButtonRelease}
        onClick={() => {changeField(changeDirection)}}
        className={cx(styles.mathButton, {
          hideForIphone8: hideForIphone8,
          hideForIphone11: !hideForIphone8,
          showForIphone8: !hideForIphone8,
          pressed: pressed
        })}
      >
        <div className={styles.buttonText}>{text}</div>
      </div>
    )
  }
}

MathButton.propTypes = {
  text: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  changeDirection: PropTypes.bool.isRequired,
  hideForIphone8: PropTypes.bool.isRequired
};

export default MathButton;
