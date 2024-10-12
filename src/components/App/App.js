import { Component } from 'react';
import Movies from '../Movies/Movies';

import './App.css';
class App extends Component {


  render() {
    return (
      <main className="container" >
        <Movies />
      </main>
    );
  }
}

export default App;
