import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button';

export default class SearchBarIndex extends Component {

  render() {
    return (
      <div className="gradient"
         style={{width:"100%", 
          padding:"1%",
          textAlign:"center",           
          marginBottom:"2%"}}>
        <h3 style={{marginBottom:"1%"}}></h3>
        <div style={{width:"100%"}}>
          <form className="form-inline padre" >
            <div className="form-group mb-2 hijo">
              <Link to={`publicaciones/${this.props.idUsuario}`}><Button style={{marginRight:"15px"}} color="secondary" variant="contained" onClick={this.handleLogout}>Buscar trabajo</Button></Link>
            </div>
            <div class="form-group mx-sm-3 mb-2 hijo">
              <Link to={`contratar/${this.props.idUsuario}`}><Button style={{marginRight:"15px"}} color="secondary" variant="contained" onClick={this.handleLogout}>Contratar</Button></Link>
            </div>                     
          </form>
        </div>
      </div>
      
    )
  }
}
