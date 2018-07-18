import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import redux,react-redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import TodoReducer from './TodoReducer';

const store = createStore(TodoReducer);

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

