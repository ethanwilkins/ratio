import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        onTouchStart={this.togglePressed}
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
  activeControl: PropTypes.string.isRequired,
  controlType: PropTypes.string.isRequired,
  setActiveControl: PropTypes.func,
  reset: PropTypes.func
};

export default ControlButton;
