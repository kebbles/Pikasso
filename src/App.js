import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import Results from './Results';

import Landing from './landingpage';
import './App.scss';

class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      data: undefined
    }
  }

  handleSubmit = (data) => {
    this.setState({
      matchData: data
    })
  }
  
  render() {
    return (
      <BrowserRouter>
        <AppBar position="relative" className="app-bar">
          <Toolbar>
            <Typography className="logo" variant="h6" color="inherit" noWrap>
              Pikasso
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="App">
          <Switch>
            <Route path="/result"><Results data={this.state.matchData} /></Route>
            <Route path="/" component={Landing} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
