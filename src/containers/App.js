import load from './load.gif'
import './App.css';
import React from 'react';
import { render } from '@testing-library/react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: false, clickCount: 0, error: false};
  }
  
  queryCountApi() {
    this.setState(state => ( {loading: true }));
    fetch(`https://api.countapi.xyz/hit/${this.props.parentKey}/${this.props.apiKey}`).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error querying API.');
      }
    })
    .then((response) => {
      this.setState(state => ( {loading: false, clickCount: response.value, error: false }));
    })
    .catch(() => {
      this.setState(state => ( {loading: false, error: true}));
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Click the button to hit the counter API.</p>
          { this.state.loading ? <img src={load} /> : <button onClick={() => this.queryCountApi()}>Count!</button> }
          <p>{this.state.error ? 'Sorry, something unexpected happened, please try again.' : `The number of clicks is: ${this.state.clickCount}` }</p>
        </header>
      </div>
    );
  } 
}

export default App;
