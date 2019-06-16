import React, { Component } from 'react'

import '../styles/style.css'
import 'bootstrap/dist/css/bootstrap.css';

import axios from 'axios'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class CachueloItem extends Component {

  constructor(props) {
    super(props)
    this.state = ({
      cotizacion: '',
      detalle: '',
      id_publicacion: '',
      id_usuario: ''
    })
    this.renderButtonOrText = this.renderButtonOrText.bind(this)
    this.ofertar = this.ofertar.bind(this)
    this.cambioCotizacion = this.cambioCotizacion.bind(this)
    this.cambioDetalle = this.cambioDetalle.bind(this)
  }

  cambioCotizacion(e) {
    this.setState( {
        cotizacion: e.target.value
    })
  }

  cambioDetalle(e) {
    this.setState( {
        detalle: e.target.value
    })
  }

  ofertar(e) {
    e.preventDefault();

    let datos = {
      cotizarOferta: this.state.cotizacion,
      detalleOferta: this.state.detalle,
      publicacion: {
        idPublicacion: this.props.idPublicacion
      },
      usuario: {
        idUsuario: this.props.idUsuarioActual
      }
    }

    axios.post('https://service-project.herokuapp.com/api/oferta/', datos )
    .then(res => {
        console.log(res.data)
        // this.setState( {                
        // });
    }).catch((error)=>{
        console.log(error.toString());
    });
  }

  renderButtonOrText() {
    if(this.props.usuario.idUsuario != this.props.idUsuarioActual) {
      return(
        <div>
          <TextField
            id="standard-name"
            label="Cotizar"
            autoComplete="off"
            value={this.state.cotizacion}
            onChange={this.cambioCotizacion}
            style={{marginRight:"5%"}}
          />
          <TextField
            id="standard-name"
            label="Detalles"
            autoComplete="off"
            value={this.state.detalle}
            onChange={this.cambioDetalle}
            // multiline
            // rows="3"
          />
          <Button 
            color="primary" 
            variant="contained"
            style={{marginTop:"1%", marginLeft:"20%"}}
            onClick={this.ofertar}
          >
            Enviar
          </Button>

        </div>
      )      
    }
    else {
      return(
        <div>
          <Button
            color="primary" 
            variant="contained"
            style={{marginTop:"1%", marginRight:"3%"}}
            // onClick={this.publicar}
          >
            Ver trabajadores
          </Button>
          <Button 
            color="primary" 
            variant="contained"
            style={{marginTop:"1%"}}
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
              <p className="card-text"><strong>Fecha: </strong>{this.props.fecha}<small className="text-muted"></small></p>
              
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
