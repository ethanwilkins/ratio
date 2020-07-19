import React, { Component } from 'react';

import MainControls from '../components/MainControls';
import Text from '../components/Text';
import Settings from '../components/Settings';

import styles from '../styles/Main.module.scss';

class Main extends Component {
  state = {
    activeControl: 'scale',
    baseSize: 16,
    scale: 2.0,
    lineHeight: 32,
    lineCount: 4,
    font: '',
    text: null,
    settingsOpen: false
  }

  componentDidMount(){
    document.addEventListener("keydown", this.closeSettings);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.closeSettings);
  }
  
  // updates value of textInput within Text
  updateTextInputValue = (event) => {
    this.setState({
      text: event.target.value
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
      lineHeight: 32,
      text: null
    })
  };

  // opens and closes settings
  toggleSettings = () => {
    const { settingsOpen } = this.state;
    this.setState({
      settingsOpen: !settingsOpen
    });
  };

  // closes settings when user hits Escape key
  closeSettings = (event) => {
    if (event.keyCode === 27) { 
      this.setState({
        settingsOpen: false
      }); 
    }
  };

  render() {
    const {
      activeControl,
      settingsOpen,
      baseSize,
      scale,
      lineHeight,
      text,
      lineCount
    } = this.state;

    return (
      <div>
        <div className={styles.main}>
          <Text
            baseSize={baseSize}
            scale={scale}
            lineHeight={lineHeight}
            text={text}
            updateTextInputValue={this.updateTextInputValue}
          />

          <MainControls
            activeControl={activeControl}
            setActiveControl={this.setActiveControl}
            changeField={this.changeField}
            settingsOpen={settingsOpen}
            toggleSettings={this.toggleSettings}
            reset={this.reset}
          />
        </div>
        
        <Settings
          baseSize={baseSize}
          scale={scale}
          lineHeight={lineHeight}
          lineCount={lineCount}
          toggleSettings={this.toggleSettings}
          settingsOpen={settingsOpen} />
      </div>
    );
  }
}

export default Main;
