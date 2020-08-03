import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import miniToolbar from '../images/miniToolbar.svg';
import exitIcon from '../images/exitIcon.svg';
import logo from '../images/logo.svg';

import styles from '../styles/Onboarding.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
 
class Onboarding extends Component {
  state = {
    slideIndex: 0
  };
  
  handleNextButtonClick = () => {
    const { slideIndex } = this.state;
    this.setState({
      slideIndex: (slideIndex > 5 ? 0 : slideIndex + 1)
    });
  };
  
  render() {
    const { slideIndex } = this.state;
    const { onboardingClosed, closeOnboarding } = this.props;

    return (onboardingClosed === undefined || localStorage.onboardingClosed === undefined) && (
      <div className={styles.onboarding}>
        <img
          onClick={closeOnboarding}
          className={styles.exitIcon}
          src={exitIcon}
          alt="Exit icon"
        />
        
        {slideIndex === 0 &&
          <div>
            <img
              className={styles.logo}
              src={logo}
              alt="Logo"
            />
            
            <div className={styles.text}>
              Creating typographic systems made easy.
            </div>
          </div>
        }
        
        {slideIndex === 1 &&
          <div>
            <img
              className={styles.miniToolbar}
              src={miniToolbar}
              alt="Mini toolbar"
            />
            
            <div
              className={styles.text}
              style={{paddingTop: '10px'}}
            >
              Select the attribute you want to modify from the tool bar
            </div>
          </div>
        }
        
        <div onClick={this.handleNextButtonClick} className={styles.nextButton}>
          <div className={styles.nextButtonText}>
            Next
          </div>
        </div>
        
        <div className={styles.ellipseButtons}>
          {_.times(7, (i) => {
            return  <span key={i} className={cx(styles.ellipseButton, {
                      ellipseButtonActive: i === slideIndex
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
