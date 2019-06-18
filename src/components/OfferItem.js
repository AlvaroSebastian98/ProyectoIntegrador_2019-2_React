import React, { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.css';

import Button from '@material-ui/core/Button';

import axios from 'axios'

export default class OfferItem extends Component {
    
    constructor(props) {
        super(props)
        this.state = ({
            oferta: null,
            publicacion: null,
        })

        this.mostrarCliente = this.mostrarCliente.bind(this)
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

    mostrarCliente() {
        console.log(this.props.estadoOferta)
        console.log(this.props.detalleOferta)
        if(this.props.estadoOferta == true) {
            return(
                <div>
                    <p className="card-text"><strong>Nombre: </strong>{this.props.nombreCliente}</p>
                    <p className="card-text"><strong>Email: </strong>{this.props.emailCliente}</p>
                    <p className="card-text"><strong>Telefono: </strong>{this.props.telefonoCliente}</p>
                </div>
            )
        } else {
            return(
                <p className="card-text"><strong>Los datos del cliente se mostrarán cuando este acepte su oferta</strong></p>
            )
        }
    }

    render() {

        return (
        <div className="card mb-3 container" style={{width:"90%", marginTop:"3%", padding:"2%"}} >
            <div className="row no-gutters">
                <div className="col-md-4" style={{marginRight:""}}>
                    {/* <img src="..." class="card-img" alt="..."  /> */}
                    <h5 style={{color: "#2C47FA"}} className="card-title">{this.props.tituloPublicacion}</h5>
                    
                    <strong><p className="card-text">Descripción: </p></strong>
                    <p className="card-text">{this.props.descripcionPublicacion}</p>
                    
                    <p className="card-text"><strong>Categoría: </strong>{this.props.oficioPublicacion}</p>

                    <p className="card-text"><strong>Distrito: </strong>{this.props.distritoPublicacion}</p>

                    <strong><p className="card-text">Habilidades: </p></strong>
                    <p className="card-text">{this.props.habilidadesPublicacion}</p>

                </div>
                <div className="col-md-8" style={{marginTop:"2%"}}>
                    <div className="card-body">
                        <p className="card-text"><strong>Precio: </strong>S/.{this.props.precioOferta}</p>
                        <strong><p className="card-text">Detalles: </p></strong>
                        <p className="card-text">{this.props.detalleOferta}</p>
                        {this.mostrarCliente()}
                    </div>
                    <div className="col-md-8" style={{marginTop:"5%"}}>
                        {/* <Button
                            color="primary"
                            variant="contained"
                            style={{marginTop:"1%", marginLeft:"20%"}}
                            // onClick={this.contratar}
                            // disabled={disabled_value}
                            >
                            Ver cliente
                        </Button> */}

                        
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
