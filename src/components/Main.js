import React, { Component } from 'react';

import cookies from 'js-cookie';

import mobile from 'is-mobile';
import { isAndroid } from 'react-device-detect';

import Text from '../components/Text';
import Toolbar from '../components/Toolbar';
import Settings from '../components/Settings';
import Onboarding from '../components/Onboarding';

import styles from '../styles/Main.module.scss';

class Main extends Component {
  state = {
    activeControl: 'scale',
    baseSize: 16,
    baseSizeInput: 16,
    scale: 2.0,
    scaleInput: 2.0,
    lineHeight: 125,
    lineHeightInput: 125,
    lineCount: 4,
    // used for changing lineCount in mobile
    lineCountInput: 4,
    font: '',
    text: null,
    currentlyInputtingText: false,
    settingsOpen: false,
    onboardingClosed: false
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyDown);
    // prevents long press or right click from opening contextmenu
    window.addEventListener("contextmenu", function(e) { e.preventDefault(); });
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("contextmenu", function(e) { e.preventDefault(); });
  }
  
  handleKeyDown = (event) => {
    const { currentlyInputtingText } = this.state;
    // closes settings when user hits Escape key
    if (event.keyCode === 27) { 
      this.setState({
        settingsOpen: false
      }); 
    }
    // space bar generates random
    else if (event.keyCode === 32 && !currentlyInputtingText) {
      this.generateRandom();
    }
  };
  
  // updates value of textInput within Text
  updateTextInputValue = (event) => {
    this.setState({
      text: event.target.value
    });
  };
  
  toggleCurrentlyInputtingText = (bool) => {
    this.setState({
      currentlyInputtingText: bool
    });
  };

  // sets which of the main controls are active, or which to increment/decrement by
  setActiveControl = (control) => {
    this.setState({
      activeControl: control
    });
  };

  // increments or decrements active field (baseSize, scale, lineHeight)
  changeField = (directionIsUp) => {
    const { activeControl } = this.state;

    if (activeControl === 'baseSize') {
      const { baseSize } = this.state;
      this.setState({
        // directionIsUp === increment, otherwise decrement
        baseSize: (directionIsUp ? baseSize + 0.5 : baseSize - 0.5)
      });
    }
    else if (activeControl === 'scale') {
      const { scale } = this.state;
      this.setState({
        // directionIsUp === increment, otherwise decrement
        scale: (directionIsUp ? scale + 0.1 : scale - 0.1)
      });
    }
    else if (activeControl === 'lineHeight') {
      const { lineHeight } = this.state;
      this.setState({
        // directionIsUp === increment, otherwise decrement
        lineHeight: (directionIsUp ? lineHeight + 1 : lineHeight - 1)
      });
    }
  };

  // resets all fields to initial values
  reset = () => {
    this.setState({
      activeControl: 'scale',
      baseSize: 16,
      scale: 2.0,
      lineHeight: 125,
      lineCount: 4,
      text: null
    });
  };
  
  generateRandom = () => {
    const { lineCount } = this.state;
    // gets maximum scale for each possible lineCount so text stays on screen
    const scaleMax = (function(lineCount) {
      switch(true) {
        case (lineCount > 8):
          return 1.3;
        case (lineCount > 7):
          return 1.4;
        case (lineCount > 6):
          return 1.6;
        case (lineCount > 5):
          return 1.8;
        default:
          return 2;
      }
    })(lineCount);
    // sets state for random values within ranges
    this.setState({
      baseSize: Math.round(Math.random() * (20 - 8) + 8),
      // does not round, as scale only goes between 2 and 1.1
      scale: Math.random() * (scaleMax - 1.1) + 1.1,
      lineHeight: Math.round(Math.random() * (200 - 100) + 100)
    });
    // haptic feedback for android
    if (isAndroid) {
      window.navigator.vibrate(1);
    }
  };
  
  updateLineCount = (event) => {
    // sets variable for input from settings
    const input = mobile() ? event.target.value : String.fromCharCode(event.which);
    // saves input temporarily until user hits enter to submit, for mobile
    if (mobile()) {
      this.setState({
        lineCountInput: input
      });
    // saves lineCount directly on key down, without extra input state, for desktop
    } else {
      // ignores enter key press, for desktop
      if (![13].includes(event.keyCode)) {
        this.setLineCount(input);
      }
    }
  };
  
  handleLineCountSubmit = (event) => {
    event.preventDefault();
    const { lineCountInput } = this.state;
    this.setLineCount(lineCountInput);
  };
  
  setLineCount = (input) => {
    input = Math.round(input);
    // saves input in state if input is a number
    if (!isNaN(input) && input <= 9) {
      this.setState({
        lineCount: input,
        lineCountInput: input
      });
      // ensures higher line counts fit onto screen with lower scale
      if (input > 4) {
        this.setState({
          scale: 1.2
        });
      }
    }
  };
  
  updateBaseSize = (event) => {
    // sets variable for input from settings
    const input = mobile() ? event.target.value : String.fromCharCode(event.which);
    // saves input temporarily until user hits enter to submit, for mobile
    if (mobile()) {
      this.setState({
        baseSizeInput: input
      });
    // saves baseSize directly on key down, without extra input state, for desktop
    } else {
      // ignores enter key press, for desktop
      if (![13].includes(event.keyCode)) {
        this.setBaseSize(input);
      }
    }
  };
  
  handleBaseSizeSubmit = (event) => {
    event.preventDefault();
    const { baseSizeInput } = this.state;
    this.setBaseSize(baseSizeInput);
  };
  
  setBaseSize = (input) => {
    input = Math.round(input);
    // saves input in state if input is a number
    if (!isNaN(input)) {
      this.setState({
        baseSize: input,
        baseSizeInput: input
      });
    }
  };
  
  updateScale = (event) => {
    // sets variable for input from settings
    const input = mobile() ? event.target.value : String.fromCharCode(event.which);
    // saves input temporarily until user hits enter to submit, for mobile
    if (mobile()) {
      this.setState({
        scaleInput: input
      });
    // saves scale directly on key down, without extra input state, for desktop
    } else {
      // ignores enter key press, for desktop
      if (![13].includes(event.keyCode)) {
        this.setScale(input);
      }
    }
  };
  
  handleScaleSubmit = (event) => {
    event.preventDefault();
    const { scaleInput } = this.state;
    this.setScale(scaleInput);
  };
  
  setScale = (input) => {
    // saves input in state if input is a number
    if (!isNaN(input)) {
      this.setState({
        scale: input,
        scaleInput: input
      });
    }
  };
  
  updateLineHeight = (event) => {
    // sets variable for input from settings
    const input = mobile() ? event.target.value : String.fromCharCode(event.which);
    // saves input temporarily until user hits enter to submit, for mobile
    if (mobile()) {
      this.setState({
        lineHeightInput: input
      });
    // saves lineHeight directly on key down, without extra input state, for desktop
    } else {
      // ignores enter key press, for desktop
      if (![13].includes(event.keyCode)) {
        this.setLineHeight(input);
      }
    }
  };
  
  handleLineHeightSubmit = (event) => {
    event.preventDefault();
    const { lineHeightInput } = this.state;
    this.setLineHeight(lineHeightInput);
  };
  
  setLineHeight = (input) => {
    // saves input in state if input is a number
    if (!isNaN(input)) {
      this.setState({
        lineHeight: input,
        lineHeightInput: input
      });
    }
  };
  
  // opens and closes settings
  toggleSettings = () => {
    const { settingsOpen } = this.state;
    this.setState({
      settingsOpen: !settingsOpen
    });
    // haptic feedback for android
    if (isAndroid) {
      window.navigator.vibrate(1);
    }
  };
  
  // called by onboarding exit button
  closeOnboarding = () => {
    // saves cookie for next visit
    cookies.set('onboardingClosed', 'true', { expires: 365 });
    // sets state for immediate visual feedback
    this.setState({
      onboardingClosed: true
    });
    // haptic feedback for android
    if (isAndroid) {
      window.navigator.vibrate(1);
    }
  };
  
  // brings Onboarding back up, from settings, also closes settings
  resetOnboarding = () => {
    cookies.set('onboardingClosed', 'false');
    this.setState({
      onboardingClosed: false
    });
    this.toggleSettings();
  };

  render() {
    const {
      activeControl,
      settingsOpen,
      onboardingClosed,
      baseSize,
      baseSizeInput,
      scale,
      scaleInput,
      lineHeight,
      lineHeightInput,
      text,
      lineCount,
      lineCountInput
    } = this.state;

    return (
      <div>
        <div className={styles.main}>
          <Text
            baseSize={baseSize}
            scale={scale}
            lineHeight={lineHeight}
            lineCount={lineCount}
            text={text}
            updateTextInputValue={this.updateTextInputValue}
            toggleCurrentlyInputtingText={this.toggleCurrentlyInputtingText}
          />

          <Toolbar
            activeControl={activeControl}
            setActiveControl={this.setActiveControl}
            changeField={this.changeField}
            settingsOpen={settingsOpen}
            toggleSettings={this.toggleSettings}
            reset={this.reset}
            generateRandom={this.generateRandom}
          />
        </div>
        
        <Settings
          baseSizeInput={baseSizeInput}
          updateBaseSize={this.updateBaseSize}
          handleBaseSizeSubmit={this.handleBaseSizeSubmit}
          
          scaleInput={scaleInput}
          updateScale={this.updateScale}
          handleScaleSubmit={this.handleScaleSubmit}
          
          
          lineHeightInput={lineHeightInput}
          updateLineHeight={this.updateLineHeight}
          handleLineHeightSubmit={this.handleLineHeightSubmit}
          
          lineCountInput={lineCountInput}
          updateLineCount={this.updateLineCount}
          handleLineCountSubmit={this.handleLineCountSubmit}
          
          toggleSettings={this.toggleSettings}
          settingsOpen={settingsOpen}
          resetOnboarding={this.resetOnboarding}
        />
          
        {!(cookies.get('onboardingClosed') === 'true' || onboardingClosed) &&
          <Onboarding closeOnboarding={this.closeOnboarding}/>
        }
      </div>
    );
  }
}

export default Main;
