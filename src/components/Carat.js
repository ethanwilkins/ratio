import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/Carat.module.scss';

class Carat extends Component {
  render() {
    const {
      cursorPosition,
      visible,
      base
    } = this.props;
    
    return visible && (
      <div
        className={styles.carat + ' ' + styles.blink}
        style={{
          width: base * 0.05 + 'px',
          height: base * 0.745 + 'px',
          top: base * 0.225 + 'px',
          left: `calc(${cursorPosition}ch - ${base * 0.025}px)`}}
      ></div>
    )

  }
}

Carat.propTypes = {
  base: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired,
  cursorPosition: PropTypes.number.isRequired
};

export default Carat;
