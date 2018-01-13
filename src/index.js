import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
// import allReducers from './reducers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
injectTapEventPlugin();
const theme = getMuiTheme({
  palette: {
    primary1Color: '#00bfa5',
    secondaryColor: '#fff',
  },
  radioButton: {
    borderColor: '#c9cccc',
    checkedColor: '#49a1d5',
  },
});
// const store = createStore();

const WebsocketApp = () => (
  <MuiThemeProvider muiTheme={theme}>
    <Provider>
    <Router>
    <App />
    </Router>
    </Provider>
  </MuiThemeProvider>
);
ReactDOM.render(<WebsocketApp />, document.getElementById('root'));
registerServiceWorker();
