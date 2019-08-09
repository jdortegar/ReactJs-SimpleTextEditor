import React, { Component } from 'react';
import ColorPicker from './ColorPicker';
import Synonyms from './Synonyms';

import './ControlPanel.css';

class ControlPanel extends Component {
  state = {
    currentStyle: {},
    currentParentStyle: {}
  };

  componentDidUpdate(prevProps) {
    const { selectedElement } = this.props;
    if (prevProps.selectedElement !== this.props.selectedElement && selectedElement !== null) {
      const parentElement = this.getParent(selectedElement);
      // Get current styles
      this.setState({
        currentStyle: selectedElement.style,
        currentParentStyle: parentElement.tagName === 'P' ? parentElement.style : {}
      });
    }
  }

  changeFormat = (prop, value = null) => {
    const { selectedElement } = this.props;

    // Validation for select word
    if (!selectedElement) return;

    let option = value;

    // Options for be applied to span

    if (!option) {
      switch (prop) {
        case 'fontWeight':
          option = selectedElement.style[prop] === 'bold' ? 'normal' : 'bold';
          break;
        case 'fontStyle':
          option = selectedElement.style[prop] === 'italic' ? 'normal' : 'italic';
          break;
        case 'textDecoration':
          option = selectedElement.style[prop] === 'underline' ? 'none' : 'underline';
          break;
        default:
          break;
      }
    }

    // Options for be applied to parent

    const parentOptions = ['textAlign', 'textIndent'];

    if (parentOptions.includes(prop)) {
      // If exists P
      const parentElement = this.getParent(selectedElement);

      if (parentElement.tagName === 'P') {
        // If option is a number
        if (typeof option === 'number') {
          const initialValue = parentElement.style[prop].split('px')[0] || 0;
          const finalValue = parseInt(initialValue) + option;
          parentElement.style[prop] = finalValue < 0 ? 0 : finalValue + 'px';
        } else {
          parentElement.style[prop] = option;
        }
        this.setState({
          currentParentStyle: parentElement.style
        });
      } else {
        const p = document.createElement('p');
        p.style[prop] = option;
        p.innerHTML = parentElement.innerHTML;
        parentElement.innerHTML = '';
        parentElement.appendChild(p);
        this.setState({
          currentParentStyle: p.style
        });
      }
    } else {
      selectedElement.style[prop] = option;
      this.setState({
        currentStyle: selectedElement.style
      });
    }
  };

  getParent = node => {
    let current = node;
    while (current.parentNode != null && current.id != 'file') {
      if (current.tagName === 'P') return current;
      current = current.parentNode;
    }
    return current;
  };

  render() {
    const { currentStyle, currentParentStyle } = this.state;
    const { selectedElement } = this.props;

    return (
      <div id="control-panel">
        <div id="format-actions">
          <div className="ButtonsSection">
            <button
              className="format-action"
              type="button"
              onClick={() => this.changeFormat('fontWeight')}
              style={{ backgroundColor: currentStyle.fontWeight === 'bold' ? '#a9a9a9' : '' }}
            >
              <b>B</b>
            </button>
            <button
              className="format-action"
              type="button"
              onClick={() => this.changeFormat('fontStyle')}
              style={{ backgroundColor: currentStyle.fontStyle === 'italic' ? '#a9a9a9' : '' }}
            >
              <i>I</i>
            </button>
            <button
              className="format-action"
              type="button"
              onClick={() => this.changeFormat('textDecoration')}
              style={{ backgroundColor: currentStyle.textDecoration === 'underline' ? '#a9a9a9' : '' }}
            >
              <u>U</u>
            </button>
          </div>
          <div className="ButtonsSection">
            <button
              className="format-action"
              type="button"
              onClick={() => this.changeFormat('textAlign', 'left')}
              style={{ backgroundColor: currentParentStyle.textAlign === 'left' ? '#a9a9a9' : '' }}
            >
              <i className=" fas fa-align-left" />
            </button>
            <button
              className="format-action"
              type="button"
              onClick={() => this.changeFormat('textAlign', 'center')}
              style={{ backgroundColor: currentParentStyle.textAlign === 'center' ? '#a9a9a9' : '' }}
            >
              <i className=" fas fa-align-center" />
            </button>
            <button
              className="format-action"
              type="button"
              onClick={() => this.changeFormat('textAlign', 'right')}
              style={{ backgroundColor: currentParentStyle.textAlign === 'right' ? '#a9a9a9' : '' }}
            >
              <i className=" fas fa-align-right" />
            </button>
          </div>
          <div className="ButtonsSection">
            <button className="format-action" type="button" onClick={() => this.changeFormat('textIndent', 40)}>
              <i className=" fas fa-indent" />
            </button>
            <button className="format-action" type="button" onClick={() => this.changeFormat('textIndent', -40)}>
              <i className=" fas fa-indent rotate180" />
            </button>
          </div>
          <div className="ButtonsSection">
            <ColorPicker changeFormat={this.changeFormat} color={currentStyle.color} />
          </div>
          <div className="ButtonsSection">
            <Synonyms selectedElement={selectedElement} />
          </div>
        </div>
      </div>
    );
  }
}

export default ControlPanel;
