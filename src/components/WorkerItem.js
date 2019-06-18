import React, { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.css';

import Button from '@material-ui/core/Button';

import axios from 'axios'

export default class WorkerItem extends Component {
    
    constructor(props) {
        super(props)
        this.state = ({
            oferta: null,
            publicacion: null,
        })

        this.contratar = this.contratar.bind(this)
    }

    componentWillMount() {
        axios.get('https://service-project.herokuapp.com/api/oferta/'+this.props.idOferta)
        .then(res => {
          this.setState({ oferta: res.data })
                        
        });

        axios.get('https://service-project.herokuapp.com/api/publicacion/'+this.props.idPublicacion)
        .then(res => {
          this.setState({ publicacion: res.data })
        });
    }

    contratar(e) {
        e.preventDefault();

        let dataOferta = {
            cotizarOferta: this.state.oferta.cotizarOferta,
            detalleOferta: this.state.oferta.detalleOferta,
            estadoOferta: true,
            publicacion: {
                idPublicacion: this.state.oferta.publicacion.idPublicacion
            },
            usuario: {
                idUsuario: this.state.oferta.usuario.idUsuario
            },            
        }

        let dataPublicacion = {
            tituloPublicacion: this.state.publicacion.tituloPublicacion,
            descripcionPublicacion: this.state.publicacion.descripcionPublicacion,
            emailPublicacion: this.state.publicacion.emailPublicacion,
            telefonoPublicacion: this.state.publicacion.telefonoPublicacion,
            habilidadesPublicacion: this.state.publicacion.habilidadesPublicacion,            
            estadoPublicacion: this.state.publicacion.estadoPublicacion,
            disponibilidadPublicacion: false,
            fechaPublicacion: this.state.publicacion.fechaPublicacion,
            calificacionEmpleado: null,
            calificacionCliente: null,
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
        
        console.log(dataOferta)
        console.log(dataPublicacion)

        axios.put('https://service-project.herokuapp.com/api/oferta/'+this.props.idOferta+'/', dataOferta )
        .then(res => {            
            console.log(res.data)
            this.setState( {
                oferta: res.data
            });                       

        }).catch((error)=>{
            console.log(error.toString());
        });

        axios.put('https://service-project.herokuapp.com/api/publicacion/'+this.props.idPublicacion+'/', dataPublicacion )
        .then(res => {
            console.log(this.props.idPublicacion)
            console.log(res.data)
            this.setState( {
                publicacion: res.data
            });
        }).catch((error)=>{
            console.log(error.toString());
        }); 

    }

    render() {                

        let telefono = 'No disponible hasta contratarlo'
        let email = 'No disponible hasta contratarlo'

        if(this.state.oferta != null) {
            if(this.state.oferta.estadoOferta == true) {                
                telefono = this.props.usuario.telefonoUsuario
                email = this.props.usuario.emailUsuario                
            }
        }        

        return (
        <div className="card mb-3 container" style={{width:"90%", marginTop:"3%", padding:"2%"}} >
            <div className="row no-gutters">
                <div className="col-md-4" style={{marginRight:""}}>
                    {/* <img src="..." class="card-img" alt="..."  /> */}
                    <h5 style={{color: "#2C47FA"}} className="card-title">{this.props.nombreUsuario}</h5>
                    <p className="card-text"><strong>Oficio 1: </strong>{this.props.oficio1}</p>
                    <p className="card-text"><strong>Oficio 2: </strong>{this.props.oficio2}</p>
                    <p className="card-text"><strong>Oficio 3: </strong>{this.props.oficio3}</p>
                    <strong><p className="card-text">Descripción del trabajador: </p></strong>
                    <p className="card-text">{this.props.descripcion}</p>                                        
                </div>
                <div className="col-md-8" style={{marginTop:"2%"}}>
                    <div className="card-body">
                        <p className="card-text"><strong>Precio: </strong>S/.{this.props.precio}</p>
                        <strong><p className="card-text">Detalles: </p></strong>
                        <p className="card-text">{this.props.detalles}</p>
                        <p className="card-text"><strong>Teléfono: </strong>{telefono}</p>
                        <p className="card-text"><strong>Email: </strong>{email}</p>
                    </div>
                    <div className="col-md-8" style={{marginTop:"5%"}}>
                        <Button
                            color="primary"
                            variant="contained"
                            style={{marginTop:"1%", marginLeft:"20%"}}
                            onClick={this.contratar}
                            // disabled={disabled_value}
                            >
                            Contratar
                        </Button>
                    </div>
                </div>                                                                    
            </div>    
            {/* <div className="row no-gutters">
                sdkdk
            </div>      */}
        </div>
        )
    }
}
