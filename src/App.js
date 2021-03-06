import React from 'react';
import './App.css';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import Calendary from './components/Calendary';
import Charts from './components/Charts';
import Navi from './components/Navi';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navi />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/customers" component={Customerlist} />
          <Route path="/trainings" component={Traininglist} />
          <Route path="/calendary" component={Calendary} />
          <Route path="/charts" component={Charts} />
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <h1>Home page for task3</h1>
  </div>
)

export default App;
