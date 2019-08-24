import React from 'react';

import logo from '../logo.svg';

class Landing extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  render() {
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
            Edit <code>src/App.js</code> and save to reload
            </p>
            <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            >
            Learn React
            </a>
        
        </header>
    )
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}

export default Landing;
