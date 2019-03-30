import React, { Component } from 'react';
import Storylist from '../src/components/storylist';
import Readingpage from '../src/components/readingpage';
import { Route, BrowserRouter } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Pragyaam</h1>
        <BrowserRouter>
          <Route exact path="/" component={Storylist} />
          <Route exact path="/readingpage" component={Readingpage} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
