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

          <MainControls
            activeControl={activeControl}
            setActiveControl={this.setActiveControl}
            settingsOpen={settingsOpen}
            toggleSettings={this.toggleSettings}
          />
        </div>
        
        <Settings toggleSettings={this.toggleSettings} settingsOpen={settingsOpen} />
      </div>
    );
  }
}

export default Main;
