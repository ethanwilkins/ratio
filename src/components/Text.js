import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextLine from '../components/TextLine';

import styles from '../styles/Text.module.scss';

class Text extends Component {
  // builds array of basePowers to loop over within output
  getBasePowers = (base, scale, lineCount) => {
    let basePowers = [base];
    for (let i=0; i < lineCount; i++) {
      base *= scale;
      basePowers.push(base);
    }
    return basePowers.reverse();
  };
  
  render() {
    const {
      baseSize,
      scale,
      lineHeight,
      lineCount,
      text,
      updateTextInputValue
    } = this.props;

    return (
      <div className={styles.output}>
        {this.getBasePowers(baseSize, scale, lineCount - 1).map(function(basePower, i) {
          return  <TextLine
                    key={i}
                    base={basePower}
                    lineHeight={lineHeight}
                    text={text}
                    updateTextInputValue={updateTextInputValue}
                  />;
        })}
      </div>
    )
  }
}

Text.propTypes = {
  baseSize: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  lineHeight: PropTypes.number.isRequired,
  lineCount: PropTypes.number.isRequired,
  text: PropTypes.string,
  updateTextInputValue: PropTypes.func.isRequired,
};

export default Text;
