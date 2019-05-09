import './App.css';
import React, { Component } from 'react'
import { BrowserRouter, Route, IndexRouter, hashHistory} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import Index from './pages/Index'
import Profile from './pages/Profile'

class App extends Component {

  render() {
    return (
      <div style={{backgroundColor: "#F1F3F1"}}>
        <BrowserRouter>
          <div>          
            <Route exact path='/' component={ Index } />            
            <Route exact path='/profile' component={ Profile } />
          </div>      
        </BrowserRouter>  
      </div>
    )
  }
}


export default App;
