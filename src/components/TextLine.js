import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Carat from '../components/Carat';

import styles from '../styles/TextLine.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class TextLine extends Component {
  constructor(props) {
    super(props);
    this.state = { focused: false }
    this.line = React.createRef();
  }
  
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  
  // determines if input for this TextLine is no longer focused
  handleClickOutside = (event) => {
    const { focused } = this.state;
    
    if (!this.line.current.contains(event.target)) {
      this.setState({
        focused: false
      });
    }
  };
  
  // sets focused state to true when input is clicked
  handleClick = () => {
    const { focused } = this.state;
    
    this.setState({
      focused: true
    });
    alert("Focused set to true.");
  };
  
  render() {
    let {
      base,
      lineHeight,
      text,
      updateTextInputValue
    } = this.props;
    
    const lineHeightAdjustment = 3.8;
    
    return (
      <div
        ref={this.line}
        onClick={this.handleClick}
        className={styles.line}
        style={{fontSize: base + 'px', background: (this.state.focused ? 'red' : 'black')}}
      >
        <Carat
          
        />
        
        <input
          className={styles.textInput}
          style={{
            fontSize: base + 'px',
            lineHeight: (lineHeight * lineHeightAdjustment) + '%',
            width: (text === null ? base.toString().length : text.length) + 'ch',
            height: (base * ((lineHeight * lineHeightAdjustment) / 100)) + 'px'
          }}
          type="text" value={text === null ? base : text}
          onChange={updateTextInputValue}
        />
        <div
          style={{lineHeight: (lineHeight * lineHeightAdjustment) + '%'}}
          className={cx(styles.lineHeight, {
            show: text === null
          })}>/{lineHeight}</div>
      </div>
    )

  }
}

TextLine.propTypes = {
  base: PropTypes.number.isRequired,
  lineHeight: PropTypes.number.isRequired,
  text: PropTypes.string,
  updateTextInputValue: PropTypes.func.isRequired,
};

export default TextLine;
