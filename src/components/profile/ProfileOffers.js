import React, { Component } from 'react'

import CachueloContent from '../../containers/CachueloContent'

import OfferItem from '../OfferItem'

import axios from 'axios'

export default class ProfileOffers extends Component {

    constructor(props) {
        super(props)
        this.state = ({
          ofertas: [],
          publicaciones: [],
          pos: null,
          filter: null,
          idUsuario: ''
        })
    }

    componentWillMount() {

        const { params } = this.props.match
        this.setState({idUsuario: params.id})
        
        axios.get('https://service-project.herokuapp.com/api/publicaciones')
        .then(res => {
          this.setState({ publicaciones: res.data })

            axios.get('https://service-project.herokuapp.com/api/ofertas')
            .then(res => {
                this.setState({ ofertas: res.data })
            });

        });
    }

    render() {
        let publicaciones = []
        let ofertas = []
                
        this.state.ofertas.forEach(oferta => {
            if(oferta.usuario.idUsuario == this.state.idUsuario) {
                publicaciones.push(oferta.publicacion)
                ofertas.push(oferta)
            }
        })
        
        if(publicaciones.length == 0) {
            return(
                <div style={{textAlign:"center", marginTop:"10%"}}>No ha realizado ninguna oferta</div>
            )
        } else {
            // return (
            //     publicaciones.map(publicacion => {
                    return(
                        ofertas.map(oferta => (
                            <OfferItem
                                tituloPublicacion={oferta.publicacion.tituloPublicacion}
                                descripcionPublicacion={oferta.publicacion.descripcionPublicacion}
                                oficioPublicacion={oferta.publicacion.oficio.nombreOficio}
                                distritoPublicacion={oferta.publicacion.distrito.nombreDistrito}
                                habilidadesPublicacion={oferta.publicacion.habilidadesPublicacion}
                                precioOferta={oferta.cotizarOferta}
                                detalleOferta={oferta.detalleOferta}
                                nombreCliente={oferta.publicacion.usuario.nombreUsuario}
                                emailCliente={oferta.publicacion.usuario.emailUsuario}
                                telefonoCliente={oferta.publicacion.usuario.telefonoUsuario}
                                estadoOferta={oferta.estadoOferta}
                            />
                        ))
                    )
                // })
                // <div>
                //     {/* <CachueloContent ofertas={ofertas} idUsuario={this.state.idUsuario} data={publicaciones} /> */}
                    
                // </div>
            // )
        }  
    }
}
