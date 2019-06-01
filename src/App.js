import './App.css';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, IndexRouter, hashHistory, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

// import Nav from './components/navbar/Nav'
import MenuAppBar from './components/navbar/MenuAppBar'
// import Config from './firebase/Config'

import Index from './pages/Index'
import Profile from './pages/Profile'
import Publicaciones from './pages/Publicaciones'
import ContratarFormulario from './pages/ContratarFormulario'

class App extends Component {

  render() {
    return (
      <div style={{backgroundColor: "#F1F3F1"}}>
        <Router>
          <MenuAppBar/>
          <div style={{marginTop:"1%", marginBottom:"1%"}}></div>
          <Switch>
            <Route exact path='/' component={ Index } />
            <Route name="profile/" path='/profile/profileInformation/:id/:username/:email/:photo' component={ Profile } />
            <Route name="publicaciones/" path='/publicaciones' component={ Publicaciones } />
            <Route name="contratar/" path='/contratar' component={ ContratarFormulario } />
          </Switch>
        </Router>  
      </div>
    )
  }
}


export default App;