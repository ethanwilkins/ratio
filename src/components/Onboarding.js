import React, { Component } from 'react';
import _ from 'lodash';

import mobile from 'is-mobile';
import { isAndroid } from 'react-device-detect';
import { Swipeable } from 'react-swipeable';

import miniToolbar from '../images/miniToolbar.svg';
import exitIcon from '../images/exitIcon.svg';
import settingsIcon from '../images/settingsIcon.svg';
import logo from '../images/logo.svg';

import styles from '../styles/Onboarding.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
 
class Onboarding extends Component {
  state = {
    slideIndex: 0,
    closed: localStorage.onboardingClosed,
    loaded: false
  };

  componentDidMount() {
    setInterval(() => {
      if (!this.state.loaded) {
        this.setState({
          loaded: true
        });
      }
    }, 1);
  }
  
  handleNextButtonClick = () => {
    const { slideIndex } = this.state;
    this.setState({
      slideIndex: (slideIndex > 5 ? 0 : slideIndex + 1)
    });
    // haptic feedback for android
    if (isAndroid) {
      window.navigator.vibrate(1);
    }
  };
  
  handleEllipseButtonClick = (slideIndex) => {
    this.setState({
      slideIndex: slideIndex
    });
    // haptic feedback for android
    if (isAndroid) {
      window.navigator.vibrate(1);
    }
  };
  
  // called by onboarding exit button
  close = () => {
    // saves for next visit
    localStorage.setItem('onboardingClosed', true);
    // sets state for immediate visual feedback
    this.setState({
      closed: true,
      slideIndex: 0
    });
    // haptic feedback for android
    if (isAndroid) {
      window.navigator.vibrate(1);
    }
  };
  
  handleSwipe = (direction) => {
    const { slideIndex } = this.state;
    if (direction === 'Left') {
      this.setState({
        slideIndex: slideIndex + 1
      }, () => {
        const { slideIndex } = this.state;
        if (slideIndex >= 7) {
          this.close();
        }
      });
    }
    else if (direction === 'Right') {
      this.setState({
        slideIndex: (slideIndex <= 0 ? 6 : slideIndex - 1)
      });
    }
  };
  
  render() {
    const { closed, slideIndex, loaded } = this.state;
    const swipeableConfig = {
            delta: 10,                             // min distance(px) before a swipe starts
            trackTouch: true,                      // track touch input
            trackMouse: true,                      // track mouse input
            rotationAngle: window.orientation      // set a rotation angle
          };

    return (
      <Swipeable onSwiped={(eventData) => this.handleSwipe(eventData.dir)} {...swipeableConfig}>
        <div className={cx(styles.onboarding, {
          showOnboarding: (closed === undefined || localStorage.onboardingClosed === undefined) && loaded
        })}>
          <img
            onClick={this.close}
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
          
          {slideIndex === 2 &&
            <div>
              <div className={styles.mathButtonsContainer}>
                <div
                  className={styles.mathButton}
                  style={{marginRight: '4px'}}
                >
                  <div className={styles.mathButtonText}>
                    +
                  </div>
                </div>
                <div className={styles.mathButton}>
                  <div className={styles.mathButtonText}>
                    -
                  </div>
                </div>
              </div>
              
              <div
                className={styles.text}
                style={{paddingTop: '10px'}}
              >
                Tap <span className={styles.blackText}>+</span> & <span className={styles.blackText}>-</span> to increase or decrease the attribute’s value
              </div>
            </div>
          }
          
          {slideIndex === 3 &&
            <div>
              <div className={styles.increaseLineCountText}>
                Increase Line Count?
              </div>
              <div className={styles.increaseLineCountBodyText}>
                Want to increase or decrease the number of lines? Tap <img src={settingsIcon} alt="Settings icon" className={styles.settingsIcon} /> and enter your desired number of lines
              </div>
            </div>
          }
          
          {slideIndex === 4 &&
            <div>
              <div className={styles.customizTextContainer}>
                <div className={styles.customizText}>
                  Customiz
                </div>
                <div className={styles.customizTextCarat + ' ' + styles.blink}></div>
              </div>
              <div className={styles.customizBodyText}>
                If you want to customize the preview text, select it!
              </div>
            </div>
          }
          
          {slideIndex === 5 &&
            <div>
              <div className={styles.customizBodyText}>
                If you’re feeling lucky tap
                {mobile() &&
                  <span>
                    &nbsp;<img src={logo} className={styles.inTextLogo} alt="ratio"/>.
                  </span>
                }
                {!mobile() &&
                  <span>
                    &nbsp;the <span className={styles.feelingLuckySpaceBarText}>space bar.</span>
                  </span>
                }
              </div>
            </div>
          }
          
          {slideIndex === 6 &&
            <div>
              <div className={styles.customizBodyText}>
                Tap reset to start from scratch.
              </div>
            </div>
          }
          
          <div
            onClick={slideIndex === 6 ? this.close : this.handleNextButtonClick}
            className={styles.nextButton}
            style={slideIndex === 6 ? {width: '112px', left: '135px'} : null}
          >
            <div className={styles.nextButtonText}>
              {slideIndex === 6 ? 'Get Started!' : 'Next'}
            </div>
          </div>
          
          <div className={styles.ellipseButtons}>
            {_.times(7, (i) => {
              return  <div
                        onClick={() => this.handleEllipseButtonClick(i)}
                        className={styles.ellipseButtonTouchTarget}
                      >
                        <div
                          key={i}
                          className={cx(styles.ellipseButton, {
                            ellipseButtonActive: i === slideIndex
                          })}></div>
                      </div>;
            })}
          </div>
        </div>
      </Swipeable>
    );
  }
}

export default Onboarding;
