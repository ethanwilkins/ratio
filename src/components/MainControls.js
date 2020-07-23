import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../components/Button';

import settingsIcon from '../images/settingsIcon.svg';
import logo from '../images/logo.svg';

import styles from '../styles/MainControls.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class MainControls extends Component {
  render() {
    const {
      activeControl,
      setActiveControl,
      changeField,
      generateRandom,
      toggleSettings,
      settingsOpen,
      reset
    } = this.props;
    
    return (
      <div className={styles.mainControls}>
        <div className={styles.row}> 
          <Button
            text="+"
            changeField={changeField}
            changeDirection={true}
            hideForIphone8={true}
          />
          <div onClick={() => {setActiveControl('baseSize')}} className={cx(styles.controlButton, {
            activeButton: activeControl === 'baseSize'
          })}>
            <div className={styles.buttonText}>Size</div>
          </div>
        </div>

        <div className={styles.row}>
          <div
            onClick={toggleSettings}
            className={styles.settingsButton + ' ' + styles.hideForIphone11 + ' ' + styles.showForIphone8}
            style={settingsOpen ? {pointerEvents: 'none'} : {}}
          >
            <img className={styles.settingsIcon} src={settingsIcon} alt="Settings Icon"/>
          </div>
          <Button
            text="-"
            changeField={changeField}
            changeDirection={false}
            hideForIphone8={true}
          />
          <div onClick={() => {setActiveControl('scale')}} className={cx(styles.controlButton, {
            activeButton: activeControl === 'scale'
          })}>
            <div className={styles.buttonText}>ratio</div>
          </div>
        </div>

        <div className={styles.row}>
          <Button
            text="+"
            changeField={changeField}
            changeDirection={true}
            hideForIphone8={false}
          />
          <div onClick={() => {setActiveControl('lineHeight')}} className={cx(styles.controlButton, {
            activeButton: activeControl === 'lineHeight'
          })}>
            <div className={styles.lineHeightButtonText}>Line Height</div>
          </div>
        </div>

        <div className={styles.row}>
          <Button
            text="-"
            changeField={changeField}
            changeDirection={false}
            hideForIphone8={false}
          />
          <div onClick={reset} className={styles.controlButton}>
            <div className={styles.buttonText}>Reset</div>
          </div>
        </div>

        <div className={styles.row + ' ' + styles.hideForIphone8}>
          <div
            onClick={toggleSettings}
            className={styles.settingsButton}
            style={settingsOpen ? {pointerEvents: 'none'} : {}}
          >
            <img className={styles.settingsIcon} src={settingsIcon} alt="Settings Icon"/>
          </div>
        </div>

        <img
          onClick={generateRandom}
          className={styles.logoButton}
          src={logo}
          alt="Logo"
        />
      </div>
    )
  }
}

MainControls.propTypes = {
  activeControl: PropTypes.string.isRequired,
  setActiveControl: PropTypes.func.isRequired,
  changeField: PropTypes.func.isRequired,
  settingsOpen: PropTypes.bool.isRequired,
  toggleSettings: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  generateRandom: PropTypes.func.isRequired
};

export default MainControls;
