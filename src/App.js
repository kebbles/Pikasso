import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import Results from './Results';
import axios from 'axios';
import Landing from './landingpage';
import './App.scss';

class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      matchData: undefined
    }
  }

  handleSubmit = (data) => {
    const model = new FormData();
    data.forEach((file, i) => {
      model.append(i, file.originFileObj);
    });
    model.append("id", 10);
    //api call with pushing model to backend, getting payload, then set state to matchData
    axios.post('http://127.0.0.1:3000/image_learn', model,
      {"headers": {'content-type': 'multipart/form-data'}})
      .then(res => {
        this.setState({
          matchData: res.data.matches,
          imageData: res.data.self
         });
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
            <Route path="/result"><Results matchData={this.state.matchData} imageData={this.state.imageData} /></Route>
            <Route path="/"><Landing handleSubmit={this.handleSubmit} /> </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
