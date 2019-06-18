import React, { Component } from 'react'

import WorkerItem from '../WorkerItem'

import axios from 'axios'

export default class ProfileWorkers extends Component {

    constructor(props){
        super(props)
        this.state = ({
            idUsuario: '',
            ofertas: [],
            publicaciones: [],
        })
        
        this.showWorkers = this.showWorkers.bind(this)
    }

    componentWillMount() {

        const { params } = this.props.match
        this.setState({idUsuario: params.id})

        // axios.get('https://service-project.herokuapp.com/api/usuario/'+this.state.id)
        //     .then(res => {
        //       this.setState({ photo: res.data.fotoUsuario })
        //       console.log(res.data)
        // });

        axios.get('https://service-project.herokuapp.com/api/ofertas/')
            .then(res => {
              this.setState({ ofertas: res.data })
              console.log(res.data)

              axios.get('https://service-project.herokuapp.com/api/publicaciones/')
                .then(res => {
                this.setState({ publicaciones: res.data })
                console.log(res.data)
        });
        });
  
    }

    showWorkers() {
        return(
            this.state.ofertas.map((oferta) => {                
                return(
                    this.state.publicaciones.map((publicacion) => {
                        if(publicacion.usuario.idUsuario == this.state.idUsuario) {
                            if(oferta.publicacion.idPublicacion == publicacion.idPublicacion) {
                                return(
                                    <WorkerItem key={oferta.idOferta}
                                                idOferta={oferta.idOferta}
                                                idPublicacion={oferta.publicacion.idPublicacion}
                                                nombreUsuario={oferta.usuario.nombreUsuario}
                                                oficio1={oferta.usuario.oficio1.nombreOficio}
                                                oficio2={oferta.usuario.oficio2.nombreOficio}
                                                oficio3={oferta.usuario.oficio3.nombreOficio}
                                                descripcion={oferta.usuario.descripcionUsuario}
                                                precio={oferta.cotizarOferta}
                                                usuario={oferta.usuario}
                                                detalles={oferta.detalleOferta}/>
                                )
                            } else {
                                // return(<div>Tercera condición no fue aceptada</div>)    
                            }
                        } else {
                            // return(<div>Segunda condición no fue aceptada</div>)
                        }           
                    })
                )
                
            })
        )
        
    }

    render() {

        return (
            <div>
                {this.showWorkers()}
            </div>
        )
    }
}
