import React, { Component } from 'react';
import PropTypes from 'prop-types';

import mobile from 'is-mobile';
import { isMobileSafari } from 'react-device-detect';

import SettingsInput from '../components/SettingsInput';

import magnifyingGlassIcon from '../images/magnifyingGlassIcon.svg';
import exitSettingsIcon from '../images/exitIcon.svg';

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
  
  // sets to true if iPhone11 and has toolbar and address bar shown
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
      
      baseSizeInput,
      updateBaseSize,
      handleBaseSizeSubmit,
      
      scaleInput,
      updateScale,
      handleScaleSubmit,
      
      lineHeightInput,
      updateLineHeight,
      handleLineHeightSubmit,
      
      lineCountInput,
      updateLineCount,
      handleLineCountSubmit,
      
      resetOnboarding
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
            <div className={styles.text}>Size</div>
            <SettingsInput
              input={baseSizeInput}
              handleInputChange={updateBaseSize}
              handleFormSubmit={handleBaseSizeSubmit}
              inputType="baseSize"
            />
          </div>
          <div className={styles.row}>
            <div className={styles.text}>Ratio</div>
            <SettingsInput
              input={scaleInput}
              handleInputChange={updateScale}
              handleFormSubmit={handleScaleSubmit}
              inputType="scale"
            />
          </div>
          <div className={styles.row}>
            <div className={styles.text}>Line height</div>
            <SettingsInput
              input={lineHeightInput}
              handleInputChange={updateLineHeight}
              handleFormSubmit={handleLineHeightSubmit}
              inputType="lineHeight"
            />
          </div>
          <div className={styles.row}>
            <div className={styles.text}>Line Count</div>            
            <SettingsInput
              input={lineCountInput}
              handleInputChange={updateLineCount}
              handleFormSubmit={handleLineCountSubmit}
              inputType="lineCount"
            />
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
          <div className={styles.resetOnboardingButton}>
            <div
              onClick={resetOnboarding}
              className={styles.resetOnboardingButtonText}
            >
              Reset Onboarding
            </div>
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
  
  baseSizeInput: PropTypes.number.isRequired,
  updateBaseSize: PropTypes.func.isRequired,
  handleBaseSizeSubmit: PropTypes.func.isRequired,
  
  scaleInput: PropTypes.number.isRequired,
  updateScale: PropTypes.func.isRequired,
  handleScaleSubmit: PropTypes.func.isRequired,
  
  lineHeightInput: PropTypes.number.isRequired,
  updateLineHeight: PropTypes.func.isRequired,
  handleLineHeightSubmit: PropTypes.func.isRequired,
  
  lineCountInput: PropTypes.number.isRequired,
  updateLineCount: PropTypes.func.isRequired,
  handleLineCountSubmit: PropTypes.func.isRequired,
  
  resetOnboarding: PropTypes.func.isRequired
};

export default Settings;
