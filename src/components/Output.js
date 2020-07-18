import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/Output.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class Output extends Component {
  render() {
    const { activeControl, baseSize, scale, lineHeight } = this.props;
    let basePower1 = baseSize * scale,
        basePower2 = baseSize * scale * scale,
        basePower3 = baseSize * scale * scale * scale;
    
    // cuts off all digits after first two starting after decimal
    basePower1 = Math.floor(basePower1 * 10) / 10;
    basePower2 = Math.floor(basePower2 * 10) / 10;
    basePower3 = Math.floor(basePower3 * 10) / 10;
    

    return (
      <div className={styles.output}>
        <div style={{fontSize: basePower3 + 'px'}}>{basePower3}<span className={cx(styles.lineHeight, {
          show: true
        })}>/{lineHeight}</span></div>

        <div style={{fontSize: basePower2 + 'px'}}>{basePower2}<span className={cx(styles.lineHeight, {
          show: true
        })}>/{lineHeight}</span></div>

        <div style={{fontSize: basePower1 + 'px'}}>{basePower1}<span className={cx(styles.lineHeight, {
          show: true
        })}>/{lineHeight}</span></div>

        <div style={{fontSize: baseSize + 'px'}}>{baseSize}<span className={cx(styles.lineHeight, {
          show: true
        })}>/{lineHeight}</span></div>
      </div>
    )

  }
}

Output.propTypes = {
  activeControl: PropTypes.string.isRequired,
  baseSize: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  lineHeight: PropTypes.number.isRequired
};

export default Output;
