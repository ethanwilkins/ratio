import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/Carat.module.scss';

class Carat extends Component {
  adjustPosition = (base, text, cursorPosition) => {
    // uses base number if no text input yet
    const content = text ? text : base.toString();
    // gets total number of all possible skinny characters
    const numOfOnes = (content.match(new RegExp("1", "g")) || []).length;
    const numOfExclamationPoints = (content.match(new RegExp("!", "g")) || []).length;
    const numOfPeriods = (content.match(/\./g) || []).length;
    const numOfCommas = (content.match(new RegExp(",", "g")) || []).length;
    const numOfSkinnyChars =  numOfOnes
                            + numOfExclamationPoints
                            + numOfPeriods
                            + numOfCommas;
    // subtracts fraction of numOfSkinnyChars from cursorPosition to get adjustedPosition
    const adjustedPosition = cursorPosition - (numOfSkinnyChars * 0.4);
    return adjustedPosition;
  };
  
  render() {
    const {
      cursorPosition,
      visible,
      base,
      text
    } = this.props;
    
    // turned off for now
    return false && (
      <div
        className={styles.carat + ' ' + styles.blink}
        style={{
          minWidth: '1px',
          width: base * 0.05 + 'px',
          height: base * 0.745 + 'px',
          top: base * 0.225 + 'px',
          left: `calc(${this.adjustPosition(base, text, cursorPosition)}ch - ${base * 0.025}px)`}}
      ></div>
    );
  }
}

Carat.propTypes = {
  base: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired,
  cursorPosition: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired
};

export default Carat;
