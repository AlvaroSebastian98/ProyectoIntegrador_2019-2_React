import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Config from '../../firebase/Config'

export default class Nav extends Component {

  constructor(props) {
    super(props)
    this.state = {          
      pos: null, 
      user: null,
    }
  }

  render() {
    return (
      <div>                
        <nav style={{backgroundColor:"#0A1138", height:"80px"}} className="navbar navbar-light">
          <Link to="/" className="navbar-brand" style={{color:"white"}}>
            <img src="/docs/4.3/assets/brand/bootstrap-solid.svg" width="30" height="30" className="d-inline-block align-top" alt="" />
            CACHUELITOS
          </Link>
          <Link to="/publicaciones">Ver trabajos</Link>
          <Link>Ver trabajadores</Link>
          <Link to="/contratar">Contratar</Link>          
          <p style={{float:"right"}} className="App-intro">{<Config/>}</p> 
        </nav>        
      </div>
    )
  }
}