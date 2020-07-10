import React, { Component } from 'react';
import PropTypes from 'prop-types';

import settingsIcon from '../images/settingsIcon.svg';
import logo from '../images/logo.svg';

import styles from '../styles/MainControls.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class MainControls extends Component {

  showSpecs = () => {
    const specs = {
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      availScreenWidth: window.screen.availWidth,
      availScreenHeight: window.screen.availHeight,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio,
      userAgent: navigator.userAgent
    };
    alert(JSON.stringify(specs));
  };

  render() {
    const { activeControl, setActiveControl, changeField, toggleSettings, settingsOpen } = this.props;

    return (
      <div className={styles.mainControls}>
        <div className={styles.row}>
          <div onClick={() => {changeField(true)}} className={styles.mathButton + ' ' + styles.hideForIphone8}>
            <div className={styles.buttonText}>+</div>
          </div>
          <div onClick={() => {setActiveControl('baseSize')}} className={cx(styles.controlButton, {
            activeButton: activeControl === 'baseSize'
          })}>
            <div className={styles.buttonText}>Size</div>
          </div>
        </div>

        <div className={styles.row}>
          <div onClick={toggleSettings} className={styles.settingsButton + ' ' + styles.hideForIphone11 + ' ' + styles.showForIphone8} style={settingsOpen ? {pointerEvents: 'none'} : {}}>
            <img className={styles.settingsIcon} src={settingsIcon} alt="Settings Icon"/>
          </div>
          <div onClick={() => {changeField(false)}} className={styles.mathButton + ' ' + styles.hideForIphone8}>
            <div className={styles.buttonText}>-</div>
          </div>
          <div onClick={() => {setActiveControl('ratio')}} className={cx(styles.controlButton, {
            activeButton: activeControl === 'ratio'
          })}>
            <div className={styles.buttonText}>ratio</div>
          </div>
        </div>

        <div className={styles.row}>
          <div onClick={() => {changeField(true)}} className={styles.mathButton + ' ' + styles.hideForIphone11 + ' ' + styles.showForIphone8}>
            <div className={styles.buttonText}>+</div>
          </div>
          <div onClick={() => {setActiveControl('lineHeight')}} className={cx(styles.controlButton, {
            activeButton: activeControl === 'lineHeight'
          })}>
            <div className={styles.lineHeightButtonText}>Line Height</div>
          </div>
        </div>

        <div className={styles.row}>
          <div onClick={() => {changeField(false)}} className={styles.mathButton + ' ' + styles.hideForIphone11 + ' ' + styles.showForIphone8}>
            <div className={styles.buttonText}>-</div>
          </div>
          <div onClick={() => {setActiveControl('ratio')}} className={styles.controlButton}>
            <div className={styles.buttonText}>Reset</div>
          </div>
        </div>

        <div className={styles.row + ' ' + styles.hideForIphone8}>
          <div onClick={toggleSettings} className={styles.settingsButton} style={settingsOpen ? {pointerEvents: 'none'} : {}}>
            <img className={styles.settingsIcon} src={settingsIcon} alt="Settings Icon"/>
          </div>
        </div>

        <img onClick={this.showSpecs} className={styles.logoButton} src={logo} alt="Logo"/>
      </div>
    )
  }
}

MainControls.propTypes = {
  activeControl: PropTypes.string.isRequired,
  setActiveControl: PropTypes.func.isRequired,
  changeField: PropTypes.func.isRequired,
  settingsOpen: PropTypes.bool.isRequired,
  toggleSettings: PropTypes.func.isRequired
};

export default MainControls;