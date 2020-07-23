import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Carat from '../components/Carat';

import styles from '../styles/TextLine.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class TextLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      cursorPosition: 0
    }
    this.input = React.createRef();
  }

  handleClick = () => {
    this.setState({
      focused: true,
      cursorPosition: this.input.current.selectionStart
    });
    // programmatically sets focus on input for this TextLine
    this.input.current.focus();
  };

  handleBlur = () => {
    this.setState({
      focused: false
    });
  };
  
  // moves carat according to keys pressed
  handleKeyPress = () => {
    this.setState({
      cursorPosition: this.input.current.selectionStart
    });
  };
  
  render() {
    const {
      focused,
      cursorPosition
    } = this.state;
    
    let {
      base,
      lineHeight,
      text,
      updateTextInputValue
    } = this.props;
    
    base = Math.round(base);
    lineHeight = Math.round(lineHeight);
    
    // adjusts to match design spec
    const lineHeightAdjustment = 3.8;
    
    return (
      <div
        onClick={this.handleClick}
        className={styles.line}
        style={{fontSize: base + 'px'}}
      >
        <Carat
          cursorPosition={cursorPosition}
          visible={focused}
          base={base}
          text={text}
        />
        
        <input
          ref={this.input}
          className={styles.textInput}
          style={{
            fontSize: base + 'px',
            lineHeight: (lineHeight * lineHeightAdjustment) + '%',
            width: (text === null ? base.toString().length : text.length) + 'ch',
            height: (base * ((lineHeight * lineHeightAdjustment) / 100)) + 'px'
          }}
          type="text" value={text === null ? base : text}
          onChange={updateTextInputValue}
          onBlur={this.handleBlur}
          onKeyDown={this.handleKeyPress}
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
