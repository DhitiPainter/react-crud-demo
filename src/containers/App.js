import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import { BookComponent } from './../components/book/book'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <div className="book">
              <BookComponent></BookComponent>
            </div>
          </header>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
