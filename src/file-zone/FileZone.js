import React, { Component } from 'react';
import './FileZone.css';

class FileZone extends Component {
  state = { selectedElement: null };

  handleClick = e => {
    const selection = window.getSelection();
    if (selection.type === 'Range') {
      if (selection.focusNode.parentNode.tagName !== 'SPAN' || selection.focusNode.data.indexOf(' ') >= 0) {
        const span = document.createElement('span');
        const range = selection.getRangeAt(0).cloneRange();
        range.surroundContents(span);
        selection.removeAllRanges();
        selection.addRange(range);
        return this.props.changeStateOnParent({ selectedElement: selection.focusNode.firstElementChild });
      } else {
        return this.props.changeStateOnParent({ selectedElement: selection.focusNode.parentElement });
      }
    }
    return this.props.changeStateOnParent({ selectedElement: null });
  };

  render() {
    return (
      <div id="file-zone">
        <div id="file" contentEditable onClick={this.handleClick} />
      </div>
    );
  }
}

export default FileZone;
