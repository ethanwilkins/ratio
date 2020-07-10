import React, { Component } from 'react';
import PropTypes from 'prop-types';

import magnifyingGlassIcon from '../images/magnifyingGlassIcon.svg';
import exitSettingsIcon from '../images/exitSettingsIcon.svg';

import styles from '../styles/Settings.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);


class Settings extends Component {
  constructor(props) {
    super(props);
    this.settings = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  // exits settings if user clicks anywhere outside of settings
  handleClickOutside = (event) => {
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
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.text}>Size/Line height</div>
            <div className={styles.button}>
              <div className={styles.buttonText}>16/24</div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.text}>Ratio</div>
            <div className={styles.button}>
              <div className={styles.buttonText}>2</div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.text}>Line Count</div>
            <div className={styles.button}>
              <div className={styles.buttonText}>4</div>
            </div>
          </div>
          <div className={styles.row + ' ' + styles.chooseFontRow}>
            <div className={styles.chooseFontText}>
              <div className={styles.textSmall}>Font</div>
              <div className={styles.caption}>Uses Google Fonts</div>
            </div>
            <div className={styles.chooseFontButton}>
              <img className={styles.chooseFontButtonIcon} src={magnifyingGlassIcon} alt="Choose a font"/>
              <div className={styles.chooseFontButtonText}>
                Inter
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.textSmall}>Export</div>
          </div>
        </div>
        <img onClick={toggleSettings} className={styles.exitButton} src={exitSettingsIcon} alt="Exit settings"/>
      </div>
    )
  }
}

Settings.propTypes = {
  toggleSettings: PropTypes.func.isRequired,
  settingsOpen: PropTypes.bool.isRequired
};

export default Settings;
