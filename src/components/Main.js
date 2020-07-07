import React, { Component } from 'react';

import Output from '../components/Output';
import Settings from '../components/Settings';

import settingsIcon from '../images/settingsIcon.svg';
import styles from '../styles/Main.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class HomePage extends Component {
  state = {
    activeControl: 'ratio',
    baseSize: 16,
    scale: 2,
    lineHeight: 32,
    font: '',
    fontWeight: '',
    settingsOpen: false
  }

  setActiveControl = (control) => {
    this.setState({
      activeControl: control
    });
  };

  toggleSettings = () => {
    const { settingsOpen } = this.state;
    this.setState({
      settingsOpen: !settingsOpen
    });
  };

  render() {
    const { activeControl, settingsOpen } = this.state;

    return (
      <div>
        <div className={styles.main}>
          <Output activeControl={activeControl} />

          <div className={styles.mainControls}>
            <div className={styles.row}>
              <div className={styles.mathButton + ' ' + styles.hideForIphone8}>
                <div className={styles.buttonText}>+</div>
              </div>
              <div onClick={() => {this.setActiveControl('size')}} className={cx(styles.controlButton, {
                activeButton: activeControl === 'size'
              })}>
                <div className={styles.buttonText}>Size</div>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.settingsButton + ' ' + styles.hideForIphone11 + ' ' + styles.showForIphone8}>
                <img className={styles.settingsIcon} src={settingsIcon} alt="Settings Icon"/>
              </div>
              <div className={styles.mathButton + ' ' + styles.hideForIphone8}>
                <div className={styles.buttonText}>-</div>
              </div>
              <div onClick={() => {this.setActiveControl('ratio')}} className={cx(styles.controlButton, {
                activeButton: activeControl === 'ratio'
              })}>
                <div className={styles.buttonText}>ratio</div>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.mathButton + ' ' + styles.hideForIphone11 + ' ' + styles.showForIphone8}>
                <div className={styles.buttonText}>+</div>
              </div>
              <div onClick={() => {this.setActiveControl('lineHeight')}} className={cx(styles.controlButton, {
                activeButton: activeControl === 'lineHeight'
              })}>
                <div className={styles.lineHeightButtonText}>Line Height</div>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.mathButton + ' ' + styles.hideForIphone11 + ' ' + styles.showForIphone8}>
                <div className={styles.buttonText}>-</div>
              </div>
              <div onClick={() => {this.setActiveControl('ratio')}} className={styles.controlButton}>
                <div className={styles.buttonText}>Reset</div>
              </div>
            </div>

            <div className={styles.row + ' ' + styles.hideForIphone8}>
              <div onClick={this.toggleSettings} className={styles.settingsButton}>
                <img className={styles.settingsIcon} src={settingsIcon} alt="Settings Icon"/>
              </div>
            </div>
          </div>

          <div className={styles.logoButton}>
            ratio
          </div>
        </div>
        
        <Settings toggleSettings={this.toggleSettings} settingsOpen={settingsOpen} />
      </div>
    );
  }
}

export default HomePage;
