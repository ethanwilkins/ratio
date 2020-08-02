import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { CookieStorage } from 'cookie-storage';

import exitIcon from '../images/exitIcon.svg';
import logo from '../images/logo.svg';

import styles from '../styles/Onboarding.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
 
// Use default cookie options
const cookies = new CookieStorage({
  // sets to expire one year from now
  expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
});

class Onboarding extends Component {
  render() {
    const { onboardingClosed, closeOnboarding } = this.props;

    return !(cookies.getItem('onboardingClosed', {expires: 365, path: ''}) === 'true' || onboardingClosed) && (
      <div className={styles.onboarding}>
        <img
          onClick={closeOnboarding}
          className={styles.exitIcon}
          src={exitIcon}
          alt="Exit icon"
        />
        
        <img
          className={styles.logo}
          src={logo}
          alt="Logo"
        />
        
        <div className={styles.text}>
          Creating typographic systems made easy.
        </div>
        
        <div className={styles.nextButton}>
          <div className={styles.nextButtonText}>
            Next
          </div>
        </div>
        
        <div className={styles.ellipseButtons}>
          {_.times(7, (i) => {
            return  <span key={i} className={cx(styles.ellipseButton, {
                      ellipseButtonActive: i === 0
                    })}></span>;
          })}
        </div>
      </div>
    );
  }
}

Onboarding.propTypes = {
  onboardingClosed: PropTypes.bool.isRequired,
  closeOnboarding: PropTypes.func.isRequired
};

export default Onboarding;
