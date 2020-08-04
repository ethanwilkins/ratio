import React, { Component } from 'react';

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
    settingsOpen: false
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    // prevents long press or right click from opening contextmenu
    window.addEventListener("contextmenu", function(e) { e.preventDefault(); });
  }

  componentWillUnmount() {
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
    // brings up settings with 's' key
    else if (event.keyCode === 83 && !currentlyInputtingText) {
      this.toggleSettings();
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
        baseSize: (directionIsUp ? baseSize + 0.5 : baseSize - 0.5),
        baseSizeInput: (directionIsUp ? baseSize + 0.5 : baseSize - 0.5)
      });
    }
    else if (activeControl === 'scale') {
      const { scale } = this.state;
      // floor to strip all digits starting 1 after decimal
      const scaleUp = Math.floor((scale + 0.1 ) * 10) / 10;
      const scaleDown = Math.floor((scale - 0.1 ) * 10) / 10;
      this.setState({
        // directionIsUp === increment, otherwise decrement (if scale is above 0.1)
        scale: (directionIsUp ? scaleUp : (scale > 1 ? scaleDown : scale)),
        scaleInput: (directionIsUp ? scaleUp : (scale > 1 ? scaleDown : scale))
      });
    }
    else if (activeControl === 'lineHeight') {
      const { lineHeight } = this.state;
      this.setState({
        // directionIsUp === increment, otherwise decrement
        lineHeight: (directionIsUp ? lineHeight + 5 : lineHeight - 5),
        lineHeightInput: (directionIsUp ? lineHeight + 5 : lineHeight - 5)
      });
    }
  };

  // resets all fields to initial values
  reset = () => {
    this.setState({
      activeControl: 'scale',
      baseSize: 16,
      baseSizeInput: 16,
      scale: 2.0,
      scaleInput: 2.0,
      lineHeight: 125,
      lineHeightInput: 125,
      lineCount: 4,
      lineCountInput: 4,
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
    const baseSize = Math.round(Math.random() * (20 - 8) + 8);
    const scale = Math.floor((Math.random() * (scaleMax - 1.1) + 1.1) * 10) / 10;
    const lineHeight = Math.round(Math.random() * (200 - 100) + 100);
    this.setState({
      baseSize: baseSize,
      baseSizeInput: baseSize,
      // does not round, as scale only goes between 2 and 1.1. floor to strip all digits starting 1 after decimal
      scale: scale,
      scaleInput: scale,
      lineHeight: lineHeight,
      lineHeightInput: lineHeight
    });
    // haptic feedback for android
    if (isAndroid) {
      window.navigator.vibrate(1);
    }
  };
  
  updateLineCount = (event) => {
    // sets variable for input from settings
    const input = event.target.value;
    // saves input temporarily until user hits enter to submit
    this.setState({
      lineCountInput: input
    });
  };
  
  handleLineCountSubmit = () => {
    const { lineCountInput } = this.state;
    this.setLineCount(lineCountInput);
    // unfocuses all input
    this.blurAll();
    // haptic feedback for android
    if (isAndroid) {
      window.navigator.vibrate(1);
    }
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
    const input = event.target.value;
    // saves input temporarily until user hits enter to submit
    this.setState({
      baseSizeInput: input
    });
  };
  
  handleBaseSizeSubmit = () => {
    const { baseSizeInput } = this.state;
    this.setBaseSize(baseSizeInput);
    // unfocuses all input
    this.blurAll();
    // haptic feedback for android
    if (isAndroid) {
      window.navigator.vibrate(1);
    }
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
    const input = event.target.value;
    // saves input temporarily until user hits enter to submit
    this.setState({
      scaleInput: input
    });
  };
  
  handleScaleSubmit = () => {
    const { scaleInput } = this.state;
    // saves input in state if input is a number
    if (!isNaN(scaleInput) && scaleInput <= 2.0) {
      this.setState({
        // strips digits starting 1 digit after decimal
        scale: Math.floor(scaleInput * 10) / 10
      });
    }
    // unfocuses all input
    this.blurAll();
    // haptic feedback for android
    if (isAndroid) {
      window.navigator.vibrate(1);
    }
  };
  
  updateLineHeight = (event) => {
    // sets variable for input from settings
    const input = event.target.value;
    // saves input temporarily until user hits enter to submit
    this.setState({
      lineHeightInput: input
    });
  };
  
  handleLineHeightSubmit = () => {
    const { lineHeightInput } = this.state;
    this.setLineHeight(lineHeightInput);
    // unfocuses all input
    this.blurAll();
    // haptic feedback for android
    if (isAndroid) {
      window.navigator.vibrate(1);
    }
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
  
  // brings Onboarding back up, from settings, also closes settings
  resetOnboarding = () => {
    localStorage.clear();
    this.setState({
      onboardingClosed: false
    });
    this.toggleSettings();
  };
  
  // blurs for any currently focused input
  blurAll = () => {
    const tmp = document.createElement("input");
    document.body.appendChild(tmp);
    tmp.focus();
    document.body.removeChild(tmp);
  };

  render() {
    const {
      activeControl,
      settingsOpen,
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
        <Onboarding />
        
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
      </div>
    );
  }
}

export default Main;
