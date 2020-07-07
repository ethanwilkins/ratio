import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/Settings.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);


class Settings extends Component {
  constructor(props) {
    super(props);
    this.settings = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick);
  }

  componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClick);
  }

  handleClick = (event) => {
    const { toggleSettings, settingsOpen } = this.props;
    if (settingsOpen) {
      if (!this.settings.current.contains(event.target)) {
        toggleSettings();
      }
    }
  };

  render() {
    const { toggleSettings, settingsOpen } = this.props;

    return (
      <div ref={this.settings} className={cx(styles.settings, {
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
