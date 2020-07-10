import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/Output.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class Output extends Component {
  render() {
    const { activeControl, baseSize, scale, lineHeight } = this.props;
    const basePower1 = baseSize * scale,
          basePower2 = baseSize * scale * scale,
          basePower3 = baseSize * scale * scale * scale;

    return (
      <div className={styles.output}>
        <div style={{fontSize: basePower3 + 'px'}}>{basePower3}<span className={cx(styles.lineHeight, {
          show: activeControl === 'ratio' || activeControl === 'baseSize'
        })}>/{lineHeight}</span></div>

        <div style={{fontSize: basePower2 + 'px'}}>{basePower2}<span className={cx(styles.lineHeight, {
          show: activeControl === 'ratio' || activeControl === 'baseSize'
        })}>/{lineHeight}</span></div>

        <div style={{fontSize: basePower1 + 'px'}}>{basePower1}<span className={cx(styles.lineHeight, {
          show: activeControl === 'ratio' || activeControl === 'baseSize'
        })}>/{lineHeight}</span></div>

        <div style={{fontSize: baseSize + 'px'}}>{baseSize}<span className={cx(styles.lineHeight, {
          show: activeControl === 'ratio' || activeControl === 'baseSize'
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