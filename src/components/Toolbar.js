import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MathButton from '../components/MathButton';
import ControlButton from '../components/ControlButton';

import settingsIcon from '../images/settingsIcon.svg';
import logo from '../images/logo.svg';

import styles from '../styles/Toolbar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class Toolbar extends Component {
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
          <MathButton
            text="+"
            changeField={changeField}
            changeDirection={true}
            hideForIphone8={true}
          />
          <ControlButton
            text="Size"
            activeControl={activeControl}
            controlType='baseSize'
            setActiveControl={setActiveControl}
          />
        </div>

        <div className={styles.row}>
          <div
            onClick={toggleSettings}
            className={styles.settingsButton + ' ' + styles.hideForIphone11 + ' ' + styles.showForIphone8}
            style={settingsOpen ? {pointerEvents: 'none'} : {}}
          >
            <img className={styles.settingsIcon} src={settingsIcon} alt="Settings Icon"/>
          </div>
          <MathButton
            text="-"
            changeField={changeField}
            changeDirection={false}
            hideForIphone8={true}
          />
          <ControlButton
            text="ratio"
            activeControl={activeControl}
            controlType='scale'
            setActiveControl={setActiveControl}
          />
        </div>

        <div className={styles.row}>
          <MathButton
            text="+"
            changeField={changeField}
            changeDirection={true}
            hideForIphone8={false}
          />
          <ControlButton
            text="Line Height"
            activeControl={activeControl}
            controlType='lineHeight'
            setActiveControl={setActiveControl}
          />
        </div>

        <div className={styles.row}>
          <MathButton
            text="-"
            changeField={changeField}
            changeDirection={false}
            hideForIphone8={false}
          />
          <ControlButton
            text="Reset"
            reset={reset}
          />
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

Toolbar.propTypes = {
  activeControl: PropTypes.string.isRequired,
  setActiveControl: PropTypes.func.isRequired,
  changeField: PropTypes.func.isRequired,
  settingsOpen: PropTypes.bool.isRequired,
  toggleSettings: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  generateRandom: PropTypes.func.isRequired
};

export default Toolbar;
