import React, { Component } from 'react';

import MainControls from '../components/MainControls';
import Output from '../components/Output';
import Settings from '../components/Settings';

import styles from '../styles/Main.module.scss';

class Main extends Component {
  state = {
    activeControl: 'ratio',
    baseSize: 16,
    scale: 2,
    lineHeight: 32,
    font: '',
    settingsOpen: false
  }

  // sets which of the main controls are active, or which to increment/decrement by
  setActiveControl = (control) => {
    this.setState({
      activeControl: control
    });
  };

  // increments or decrements active field (baseSize, scale, lineHeight)
  changeField = (directionIsUp) => { // directionIsUp === increment, otherwise decrement
    const { activeControl } = this.state;

    if (activeControl === 'baseSize') {
      const { baseSize } = this.state;
      this.setState({
        baseSize: (directionIsUp ? baseSize + 1 : baseSize - 1)
      });
    }
    else if (activeControl === 'scale') {
      const { scale } = this.state;
      this.setState({
        scale: (directionIsUp ? scale + 1 : scale - 1)
      });
    }
    else if (activeControl === 'lineHeight') {
      const { lineHeight } = this.state;
      this.setState({
        lineHeight: (directionIsUp ? lineHeight + 1 : lineHeight - 1)
      });
    }
  };

  reset = () => {
    this.setState({
      activeControl: 'ratio',
      baseSize: 16,
      scale: 2,
      lineHeight: 32
    })
  };

  // opens and closes settings
  toggleSettings = () => {
    const { settingsOpen } = this.state;
    this.setState({
      settingsOpen: !settingsOpen
    });
  };

  render() {
    const { activeControl, settingsOpen, lineHeight } = this.state;

    return (
      <div>
        <div className={styles.main}>
          <Output
            activeControl={activeControl}
            lineHeight={lineHeight}
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
        
        <Settings toggleSettings={this.toggleSettings} settingsOpen={settingsOpen} />
      </div>
    );
  }
}

export default Main;
