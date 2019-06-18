import React, { Component } from 'react'

import '../styles/style.css'
import 'bootstrap/dist/css/bootstrap.css';

import axios from 'axios'

import { Link } from 'react-router-dom'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class CachueloItem extends Component {

  constructor(props) {
    super(props)
    this.state = ({
      ofertas: [],
      usuario_actual:'',
      publicacion: '',
      cotizacion: '',
      detalle: '',
      id_publicacion: '',
      id_usuario: ''
    })
    this.renderButtonOrText = this.renderButtonOrText.bind(this)
    this.ofertar = this.ofertar.bind(this)
    this.cambioCotizacion = this.cambioCotizacion.bind(this)
    this.cambioDetalle = this.cambioDetalle.bind(this)
    this.terminarPublicacion = this.terminarPublicacion.bind(this)
  }

  componentWillMount() {
    axios.get('https://service-project.herokuapp.com/api/usuario/'+this.props.idUsuarioActual)
    .then(res => {
        console.log(res.data)
        this.setState( {
          usuario_actual: res.data
        });
    }).catch((error)=>{
        console.log(error.toString());
    });

    axios.get('https://service-project.herokuapp.com/api/publicacion/'+this.props.idPublicacion)
    .then(res => {
        console.log(res.data)
        this.setState( {
          publicacion: res.data
        });
    }).catch((error)=>{
        console.log(error.toString());
    });

    axios.get('https://service-project.herokuapp.com/api/ofertas/')
    .then(res => {
        console.log(res.data)
        this.setState( {
          ofertas: res.data
        });
    }).catch((error)=>{
        console.log(error.toString());
    });
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

  terminarPublicacion(e) {
    e.preventDefault();

    let data = {
      tituloPublicacion: this.state.publicacion.tituloPublicacion,
      descripcionPublicacion: this.state.publicacion.descripcionPublicacion,
      emailPublicacion: this.state.publicacion.emailPublicacion,
      telefonoPublicacion: this.state.publicacion.telefonoPublicacion,
      habilidadesPublicacion: this.state.publicacion.habilidadesPublicacion,
      disponibilidadPublicacion: this.state.publicacion.disponibilidadPublicacion,
      estadoPublicacion: false,            
      fechaPublicacion: this.state.publicacion.fechaPublicacion,
      usuario: {
          idUsuario: this.state.publicacion.usuario.idUsuario
      },
      distrito: {
          idDistrito: this.state.publicacion.distrito.idDistrito
      },
      oficio: {
          idOficio: this.state.publicacion.oficio.idOficio
      }
    }

    axios.put('https://service-project.herokuapp.com/api/publicacion/'+this.props.idPublicacion+'/', data)
      .then(res => {
          
          console.log(res.data)
          this.setState( {
              publicacion: res.data
          });
      }).catch((error)=>{
          console.log(error.toString());
    });


  }

  renderButtonOrText() {
    let disabled_value = true
    let mensaje = null
    if(this.props.usuario.idUsuario != this.props.idUsuarioActual) {
      console.log(this.props.ofertas)
    
      // this.state.ofertas.forEach(oferta => {
      //   if(oferta.usuario.idUsuario == this.props.idUsuarioActual) {
      //     if(oferta.publicacion.idPublicacion == this.props.idPublicacion) {
      //       return(<div>En espera</div>)
      //     }
      //   }   
      //   else {

      //   }     
      // })

      if(this.state.usuario_actual.estadoUsuario == true) {
        disabled_value = false
        // mensaje = '¡ Oferta la publicación !'
      } else {
        mensaje = 'Necesitas habilitar la opción de trabajador'
      }
      return(
        <div>
          <div style={{color:"red"}}>{mensaje}</div>
          <div>
            <TextField
              id="standard-name"
              label="Cotizar"
              autoComplete="off"
              value={this.state.cotizacion}
              onChange={this.cambioCotizacion}
              disabled={disabled_value}
              style={{marginRight:"5%"}}
            />
            <TextField
              id="standard-name"
              label="Detalles"
              autoComplete="off"
              value={this.state.detalle}
              onChange={this.cambioDetalle}
              disabled={disabled_value}
              multiline
            />
            <Button
              color="primary"
              variant="contained"
              style={{marginTop:"1%", marginLeft:"20%"}}
              onClick={this.ofertar}
              disabled={disabled_value}
            >
              Enviar
            </Button>
          </div>          
        </div>        
      )
    }
    else {
      return(
        <div>
          <Link to={`/profile/profileWorkers/${this.props.idUsuarioActual}`}>
            <Button
              color="primary" 
              variant="contained"
              style={{marginTop:"1%", marginRight:"3%"}}              
            >
              Ver trabajadores
            </Button>
          </Link>          
            <Button 
              color="primary" 
              variant="contained"
              style={{marginTop:"1%"}}
              onClick={this.terminarPublicacion}
              >
                Terminar publicación
            </Button>                                          
        </div>
      )
    }
  }

  render() {
    
    let mensaje = null
    if(this.state.publicacion.estadoPublicacion == false) {
        mensaje = 'Publicación finalizada'
    }

    return (
      <div className="card mb-3 container" style={{width:"90%", marginTop:"3%", padding:"2%"}} >
        <div className="row no-gutters">
            <div style={{ color:'red',
                          position:"absolute",
                          padding:"3%",
                          top:"0",
                          right:"0"}}>
              {mensaje}
            </div>
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
            <div className="card-body">{this.state.mensaje}</div>
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
