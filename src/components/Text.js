import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextLine from '../components/TextLine';

import styles from '../styles/Text.module.scss';

class Text extends Component {
  render() {
    let {
      baseSize,
      scale,
      lineHeight,
      text,
      updateTextInputValue
    } = this.props;
    
    let basePower1 = baseSize * scale,
        basePower2 = baseSize * scale * scale,
        basePower3 = baseSize * scale * scale * scale;
    
    // cuts off all digits after first one starting after decimal
    basePower1 = Math.floor(basePower1 * 10) / 10;
    basePower2 = Math.floor(basePower2 * 10) / 10;
    basePower3 = Math.floor(basePower3 * 10) / 10;
    
    lineHeight = Math.floor(lineHeight * 10) / 10;

    return (
      <div className={styles.output}>
        <TextLine
          base={basePower3}
          lineHeight={lineHeight}
          text={text}
          updateTextInputValue={updateTextInputValue}
        />
        
        <TextLine
          base={basePower2}
          lineHeight={lineHeight}
          text={text}
          updateTextInputValue={updateTextInputValue}
        />
        
        <TextLine
          base={basePower1}
          lineHeight={lineHeight}
          text={text}
          updateTextInputValue={updateTextInputValue}
        />
        
        <TextLine
          base={baseSize}
          lineHeight={lineHeight}
          text={text}
          updateTextInputValue={updateTextInputValue}
        />
      </div>
    )
  }
}

Text.propTypes = {
  baseSize: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  lineHeight: PropTypes.number.isRequired,
  text: PropTypes.string,
  updateTextInputValue: PropTypes.func.isRequired,
};

export default Text;
