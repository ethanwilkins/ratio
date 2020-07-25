import React, { Component } from 'react';
import PropTypes from 'prop-types';

import mobile from 'is-mobile';
import { isMobileSafari } from 'react-device-detect';

import magnifyingGlassIcon from '../images/magnifyingGlassIcon.svg';
import exitSettingsIcon from '../images/exitSettingsIcon.svg';

import styles from '../styles/Settings.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);


class Settings extends Component {
  constructor(props) {
    super(props);
    this.settings = React.createRef();
    this.lineCountInput = React.createRef();
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
  
  focusLineCountInput = () => {
    this.lineCountInput.current.focus();
  };
  
  // determines if iPhone11 and has toolbar and address bar shown
  isIphone11WithToolbarShown = () => {
    return isMobileSafari
      && window.screen.width === 414 && window.screen.height === 896
      && window.innerHeight === 719
      && window.devicePixelRatio === 2
      && window.orientation === 0;
  }
  
  showSpecs = () => {
    const specs = {
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      availScreenWidth: window.screen.availWidth,
      availScreenHeight: window.screen.availHeight,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      orientation: (window.orientation === 0 ? 'portrait' : 'landscape'),
      devicePixelRatio: window.devicePixelRatio,
      userAgent: navigator.userAgent,
      isIphone11WithToolbarShown: this.isIphone11WithToolbarShown()
    };
    alert(JSON.stringify(specs));
  };

  render() {
    const {
      toggleSettings,
      settingsOpen,
      baseSize,
      scale,
      lineHeight,
      lineCountInput,
      updateLineCount,
      handleLineCountSubmit
    } = this.props;

    return (
      <div
        ref={this.settings}
        style={mobile() ? null : {position: 'absolute', right: '15px'}}
        className={cx(styles.settings, {
        show: settingsOpen
      })}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.text}>Size/Line height</div>
            <div className={styles.button}>
              <div className={styles.buttonText}>{baseSize}/{lineHeight}</div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.text}>Ratio</div>
            <div className={styles.button}>
              <div className={styles.buttonText}>{Math.floor(scale * 100) / 100}</div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.text}>Line Count</div>
            <div onClick={this.focusLineCountInput} className={styles.button}>
              {mobile() &&
                <form
                  className={styles.lineCountForm}
                  noValidate
                  autoComplete="off"
                  onSubmit={handleLineCountSubmit}
                >
                  <input
                    ref={this.lineCountInput}
                    className={styles.lineCountInput}
                    type="text" value={lineCountInput}
                    onChange={updateLineCount}
                    onBlur={this.handleBlur}
                  />
                </form>
              }
              {!mobile() &&
                <input
                  ref={this.lineCountInput}
                  className={styles.lineCountInput}
                  type="text" value={lineCountInput}
                  onKeyDown={updateLineCount}
                  onChange={updateLineCount}
                  onBlur={this.handleBlur}
                />
              }
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
          <div onClick={this.showSpecs} className={styles.row}>
            <div className={styles.textSmall}>Export</div>
          </div>
        </div>
        <img
          style={this.isIphone11WithToolbarShown() ? {bottom: '150px'} : null}
          onClick={toggleSettings}
          className={styles.exitButton}
          src={exitSettingsIcon}
          alt="Exit settings"
        />
      </div>
    )
  }
}

Settings.propTypes = {
  toggleSettings: PropTypes.func.isRequired,
  settingsOpen: PropTypes.bool.isRequired,
  baseSize: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  lineHeight: PropTypes.number.isRequired,
  lineCountInput: PropTypes.number.isRequired,
  updateLineCount: PropTypes.func.isRequired,
  handleLineCountSubmit: PropTypes.func.isRequired
};

export default Settings;
