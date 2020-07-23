import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/Button.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = { pressed: false }
    this.button = React.createRef();
  }

  state = { pressed: false }
  
  componentDidMount() {
    document.addEventListener('touchstart', this.onTouchHandler);
    document.addEventListener('touchend', this.onTouchHandler);
  }

  componentWillUnmount() {
    document.removeEventListener('touchstart', this.onTouchHandler);
    document.removeEventListener('touchend', this.onTouchHandler);
  }

  onTouchHandler = ({ target }) => {
    const { pressed } = this.state;
    if (this.button.current.contains(target)) {
      this.setState({
        pressed: !pressed
      });
    }
  };
  
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
      changeField,
      changeDirection,
      hideForIphone8
    } = this.props;
    
    return (
      <div
        ref={this.button}
        onMouseDown={this.togglePressed}
        onMouseUp={this.togglePressed}
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

Button.propTypes = {
  text: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  changeDirection: PropTypes.bool.isRequired,
  hideForIphone8: PropTypes.bool.isRequired
};

export default Button;
