import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/TextLine.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class TextLine extends Component {
  render() {
    let {
      base,
      lineHeight,
      text,
      updateTextInputValue
    } = this.props;
    
    const lineHeightAdjustment = 3.8;
    
    return (
      <div className={styles.line} style={{fontSize: base + 'px'}}>
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
