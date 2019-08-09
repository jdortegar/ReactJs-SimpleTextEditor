import React, { Component } from 'react';
import './App.css';
import ControlPanel from './control-panel/ControlPanel';
import FileZone from './file-zone/FileZone';
import getMockText from './text.service';

class App extends Component {
  state = {
    selectedElement: null
  };

  changeStateOnParent = element => {
    this.setState({ ...element });
  };

  getText() {
    getMockText().then(function(result) {
      console.log(result);
    });
  }
  render() {
    return (
      <div className="App">
        <header>
          <span>Simple Text Editor</span>
        </header>
        <main>
          <ControlPanel selectedElement={this.state.selectedElement} />
          <FileZone changeStateOnParent={this.changeStateOnParent} />
        </main>
      </div>
    );
  }
}

export default App;
