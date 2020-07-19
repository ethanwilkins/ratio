import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/Output.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class Output extends Component {
  render() {
    let {
      baseSize,
      scale,
      lineHeight,
      text,
      updateTextInputValue
    } = this.props;
    
    let basePower1 = baseSize * scale,
        basePower2 = baseSize * scale * scale,
        basePower3 = baseSize * scale * scale * scale;
    
    // cuts off all digits after first one starting after decimal
    basePower1 = Math.floor(basePower1 * 10) / 10;
    basePower2 = Math.floor(basePower2 * 10) / 10;
    basePower3 = Math.floor(basePower3 * 10) / 10;
    
    lineHeight = Math.floor(lineHeight * 10) / 10;
    

    return (
      <div className={styles.output}>
        <div className={styles.line} style={{fontSize: basePower3 + 'px'}}>
          <input
            className={styles.textInput}
            style={{
              fontSize: basePower3 + 'px',
              lineHeight: lineHeight,
              width: (text === null ? basePower3.toString().length : text.length) + 'ch',
              height: (basePower3 * lineHeight) + 'px'
            }}
            type="text" value={text === null ? basePower3 : text}
            onChange={updateTextInputValue}
          />
          <div style={{lineHeight: lineHeight}} className={cx(styles.lineHeight, {
            show: text === null
          })}>/{lineHeight}</div>
        </div>
        
        <div className={styles.line} style={{fontSize: basePower2 + 'px'}}>
          <input
            className={styles.textInput}
            style={{
              fontSize: basePower2 + 'px',
              lineHeight: lineHeight,
              width: (text === null ? basePower2.toString().length : text.length) + 'ch',
              height: (basePower2 * lineHeight) + 'px'
            }}
            type="text" value={text === null ? basePower2 : text}
            onChange={updateTextInputValue}
          />
          <div style={{lineHeight: lineHeight}} className={cx(styles.lineHeight, {
            show: text === null
          })}>/{lineHeight}</div>
        </div>
        
        <div className={styles.line} style={{fontSize: basePower1 + 'px'}}>
          <input
            className={styles.textInput}
            style={{
              fontSize: basePower1 + 'px',
              lineHeight: lineHeight,
              width: (text === null ? basePower1.toString().length : text.length) + 'ch',
              height: (basePower1 * lineHeight) + 'px'
            }}
            type="text" value={text === null ? basePower1 : text}
            onChange={updateTextInputValue}
          />
          <div style={{lineHeight: lineHeight}} className={cx(styles.lineHeight, {
            show: text === null
          })}>/{lineHeight}</div>
        </div>
        
        <div className={styles.line} style={{fontSize: baseSize + 'px'}}>
          <input
            className={styles.textInput}
            style={{
              fontSize: baseSize + 'px',
              lineHeight: lineHeight,
              width: (text === null ? baseSize.toString().length : text.length) + 'ch',
              height: (baseSize * lineHeight) + 'px'
            }}
            type="text" value={text === null ? baseSize : text}
            onChange={updateTextInputValue}
          />
          <div style={{lineHeight: lineHeight}} className={cx(styles.lineHeight, {
            show: text === null
          })}>/{lineHeight}</div>
        </div>
        
      </div>
    )

  }
}

Output.propTypes = {
  baseSize: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  lineHeight: PropTypes.number.isRequired,
  text: PropTypes.string,
  updateTextInputValue: PropTypes.func.isRequired,
};

export default Output;
