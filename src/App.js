import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import Results from './Results';

import Landing from './landingpage';
import './App.scss';

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/result" component={Results} />
            <Route path="/" component={Landing} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
