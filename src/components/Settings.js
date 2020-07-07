import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/Settings.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);


class Settings extends Component {

  render() {
    const { toggleSettings, settingsOpen } = this.props;

    return (
      <div className={cx(styles.settings, {
        show: settingsOpen
      })}>
        <div className={styles.exitButton} onClick={toggleSettings}>
          <i className="fa fa-times-circle"></i>
        </div>
      </div>
    )

  }
}

Settings.propTypes = {
  toggleSettings: PropTypes.func.isRequired,
  settingsOpen: PropTypes.bool.isRequired
};

export default Settings;
