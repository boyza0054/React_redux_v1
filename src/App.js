import React, { Component } from 'react';
import './App.css';
import TodoList from './component/Todolist';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <header className="App-header" style={{ marginBottom: "20px" }}>
          <h3 className="apptitle">MY TO DO LIST</h3>
        </header>
        <TodoList />
      </div>
    );
  }
}

export default App;
