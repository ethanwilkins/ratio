import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/Output.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class Output extends Component {
  render() {
    const {
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
    

    return (
      <div className={styles.output}>
        <div style={{fontSize: basePower3 + 'px'}}>
          <input
            className={styles.textInput}
            style={{
              fontSize: basePower3 + 'px',
              width: (text === null ? basePower3.toString().length : text.length) + 'ch'
            }}
            type="text" value={text === null ? basePower3 : text}
            onChange={updateTextInputValue}
          />
          <span className={cx(styles.lineHeight, {
            show: text === null
          })}>/{lineHeight}</span>
        </div>
        
        <div style={{fontSize: basePower2 + 'px'}}>
          <input
            className={styles.textInput}
            style={{
              fontSize: basePower2 + 'px',
              width: (text === null ? basePower2.toString().length : text.length) + 'ch'
            }}
            type="text" value={text === null ? basePower2 : text}
            onChange={updateTextInputValue}
          />
          <span className={cx(styles.lineHeight, {
            show: text === null
          })}>/{lineHeight}</span>
        </div>
        
        <div style={{fontSize: basePower1 + 'px'}}>
          <input
            className={styles.textInput}
            style={{
              fontSize: basePower1 + 'px',
              width: (text === null ? basePower1.toString().length : text.length) + 'ch'
            }}
            type="text" value={text === null ? basePower1 : text}
            onChange={updateTextInputValue}
          />
          <span className={cx(styles.lineHeight, {
            show: text === null
          })}>/{lineHeight}</span>
        </div>
        
        <div style={{fontSize: baseSize + 'px'}}>
          <input
            className={styles.textInput}
            style={{
              fontSize: baseSize + 'px',
              width: (text === null ? baseSize.toString().length : text.length) + 'ch'
            }}
            type="text" value={text === null ? baseSize : text}
            onChange={updateTextInputValue}
          />
          <span className={cx(styles.lineHeight, {
            show: text === null
          })}>/{lineHeight}</span>
        </div>
        
      </div>
    )

  }
}

Output.propTypes = {
  baseSize: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  lineHeight: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  updateTextInputValue: PropTypes.func.isRequired,
};

export default Output;
