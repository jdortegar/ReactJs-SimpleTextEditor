import React from 'react';

class Synonyms extends React.Component {
  state = {
    displaySynonyms: false,
    loading: false,
    synonymsArray: []
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.displaySynonyms !== this.state.displaySynonyms && this.state.displaySynonyms === true) {
      const { selectedElement } = this.props;
      const selectWord = selectedElement.textContent;

      this.setState({ loading: true });

      fetch('http://api.datamuse.com/words?rel_syn=' + selectWord, {
        method: 'get'
      })
        .then(response => {
          return response.json();
        })
        .then(response => {
          this.setState({ loading: false, synonymsArray: response });
        })
        .catch(error => {
          this.setState({ loading: false });
          console.log('error', error);
        });
    }
  }

  handleClick = () => {
    this.setState({ displaySynonyms: !this.state.displaySynonyms });
  };

  handleClose = () => {
    this.setState({ displaySynonyms: false });
  };

  renderSynonyms = () => {
    const { synonymsArray } = this.state;
    if (synonymsArray.length > 0) {
      return synonymsArray.map(element => (
        <li onClick={event => this.handleWordClick(event)} key={element.word}>
          {element.word}
        </li>
      ));
    }

    return <li>No Results</li>;
  };

  handleWordClick = event => {
    const { selectedElement } = this.props;
    return (selectedElement.innerText = event.target.textContent);
  };

  render() {
    const popover = {
      position: 'absolute',
      zIndex: '2'
    };
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px'
    };

    const { loading } = this.state;

    return (
      <div>
        <button onClick={this.handleClick}>Synonyms</button>
        {this.state.displaySynonyms ? (
          <div style={popover}>
            <div style={cover} onClick={this.handleClose} />
            <div className="synonymsContainer">
              {loading && (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
                  className="imgResponsive"
                />
              )}
              {!loading && (
                <div>
                  <div className="SynonymsTitle">Please Select One</div>
                  <ul>{this.renderSynonyms()}</ul>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Synonyms;
