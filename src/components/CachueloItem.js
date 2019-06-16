import React, { Component } from 'react'

import '../styles/style.css'
import 'bootstrap/dist/css/bootstrap.css';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class CachueloItem extends Component {

  constructor(props) {
    super(props)
    this.renderButtonOrText = this.renderButtonOrText.bind(this)
  }

  renderButtonOrText() {
    if(this.props.usuario.idUsuario != this.props.idUsuarioActual) {
      return(
        <div>
          <strong><p className="card-text">Cotizar: </p></strong>
          <TextField
            id="standard-name"
            label="Cotizar"
            autoComplete="off"
          />
          <strong><p className="card-text">Detalles: </p></strong>
          <TextField
            id="standard-name"
            label="Detalles"
            autoComplete="off"
          />
        </div>
      )      
    }
    else {
      return(
        <div>
          <Button 
            color="primary" 
            variant="contained"
            style={{marginTop:"16%"}}
            // onClick={this.publicar}
          >
            Ver trabajadores
          </Button>
          <br />
          <Button 
            color="primary" 
            variant="contained"
            style={{marginTop:"16%"}}
            // onClick={this.publicar}
            >
              Terminar publicación
          </Button>
        </div>        
      )
    }
  }

  render() {
    return (
      <div className="card mb-3 container" style={{width:"90%", marginTop:"3%", padding:"2%"}} >
        <div className="row no-gutters">
          <div className="col-md-4" style={{marginRight:""}}>
            {/* <img src="..." class="card-img" alt="..."  /> */}
            <h5 style={{color: "#2C47FA"}} className="card-title">{this.props.titulo}</h5>
            <strong><p className="card-text">Descripción del cachuelo: </p></strong>
            <p className="card-text">{this.props.descripcion}</p>
            <p className="card-text"><strong>Oficio: </strong>{this.props.oficio.nombreOficio}</p>
            <p className="card-text"><strong>Distrito: </strong>{this.props.distrito.nombreDistrito}</p>            
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <strong><p className="card-text">Habilidades: </p></strong>
              <p className="card-text">{this.props.habilidades}</p>
              <p className="card-text"><strong>Fecha: </strong>{this.props.fecha}<small class="text-muted"></small></p>
              
              {this.renderButtonOrText()}
              
            </div>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              
            </div>
          </div>                  
        </div>         
      </div>
    )
  }
}
