import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/Output.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);


class Output extends Component {

  render() {
    const { activeControl } = this.props;

    return (
      <div className={styles.output}>
        <div style={{fontSize: '128px'}}>128<span className={cx(styles.ratio, {
          show: activeControl === 'ratio' || activeControl === 'size'
        })}>/32</span></div>

        <div style={{fontSize: '64px'}}>64<span className={cx(styles.ratio, {
          show: activeControl === 'ratio' || activeControl === 'size'
        })}>/32</span></div>

        <div style={{fontSize: '32px'}}>32<span className={cx(styles.ratio, {
          show: activeControl === 'ratio' || activeControl === 'size'
        })}>/32</span></div>

        <div style={{fontSize: '16px'}}>16<span className={cx(styles.ratio, {
          show: activeControl === 'ratio' || activeControl === 'size'
        })}>/32</span></div>
      </div>
    )

  }
}

Output.propTypes = {
  activeControl: PropTypes.string.isRequired
};

export default Output;