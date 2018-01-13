import React, { Component } from 'react';
import logo from './logo.svg';
import AppBar from 'material-ui/AppBar';

import './App.css';
import Chat from './chat';

const AppBarExampleIcon = () => (
  <AppBar
    title="WEB SOCKET COMMUNICATION"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  />
);
class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBarExampleIcon />
        <Chat />
      </div>
    );
  }
}

export default App;
