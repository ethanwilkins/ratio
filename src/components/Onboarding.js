import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import exitIcon from '../images/exitIcon.svg';
import logo from '../images/logo.svg';

import styles from '../styles/Onboarding.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
 
class Onboarding extends Component {
  render() {
    const { onboardingClosed, closeOnboarding } = this.props;

    return (onboardingClosed === undefined || localStorage.onboardingClosed === undefined) && (
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
  onboardingClosed: PropTypes.string.isRequired,
  closeOnboarding: PropTypes.func.isRequired
};

export default Onboarding;
