import React from 'react';

import styles from '../styles/HomePage.module.scss';

const HomePage = () => (
  <div className={styles.home}>
    <div className={styles.output}>
      <div style={{fontSize: '128px'}}>128</div>
      <div style={{fontSize: '64px'}}>64</div>
      <div style={{fontSize: '32px'}}>32</div>
      <div style={{fontSize: '16px'}}>16</div>
    </div>
    <div className={styles.mainControls}>
      <div className={styles.row}>
        <div className={styles.mathButton + ' ' + styles.hideForIphone8}>
          <div className={styles.buttonText}>+</div>
        </div>
        <div className={styles.controlButton + ' ' + styles.activeButton}>
          <div className={styles.buttonText}>Size</div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.settingsButton + ' ' + styles.hideForIphone11 + ' ' + styles.showForIphone8}>
          <div className={styles.settingsButtonText}><i className="fa fa-cog"></i></div>
        </div>
        <div className={styles.mathButton + ' ' + styles.hideForIphone8}>
          <div className={styles.buttonText}>-</div>
        </div>
        <div className={styles.controlButton}>
          <div className={styles.buttonText}>ratio</div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.mathButton + ' ' + styles.hideForIphone11 + ' ' + styles.showForIphone8}>
          <div className={styles.buttonText}>+</div>
        </div>
        <div className={styles.controlButton}>
          <div className={styles.lineHeightButtonText}>Line Height</div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.mathButton + ' ' + styles.hideForIphone11 + ' ' + styles.showForIphone8}>
          <div className={styles.buttonText}>-</div>
        </div>
        <div className={styles.controlButton}>
          <div className={styles.buttonText}>Reset</div>
        </div>
      </div>
      <div className={styles.row + ' ' + styles.hideForIphone8}>
        <div className={styles.settingsButton}>
          <div className={styles.settingsButtonText}><i className="fa fa-cog"></i></div>
        </div>
      </div>
    </div>
    <div className={styles.logoButton}>
      ratio
    </div>
  </div>
);

export default HomePage;
