import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/Carat.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class Carat extends Component {
  render() {
    const { base } = this.props;
    
    return (
      <div className={styles.carat}>
      </div>
    )

  }
}

Carat.propTypes = {
  base: PropTypes.number.isRequired
};

export default Carat;
