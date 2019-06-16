import React, { Component } from 'react'

import CachueloContent from '../../containers/CachueloContent'

import axios from 'axios'

export default class ProfilePublications extends Component {

    constructor(props) {
        super(props)
        this.state = {
          publicaciones: [],
          pos: null,
          filter: null,
          idUsuario: ''
        };
    }
    
    componentWillMount() {

        const { params } = this.props.match
        this.setState({idUsuario: params.id})

        axios.get('https://service-project.herokuapp.com/api/publicaciones')
        .then(res => {
          this.setState({ publicaciones: res.data })
        });
    }

    render() {

        let publicaciones = []
        
        this.state.publicaciones.forEach((publicacion) => {
            if(publicacion.usuario.idUsuario == this.state.idUsuario) {
                publicaciones.push(publicacion)
            }
        })

        return (
            <div>
                <CachueloContent idUsuario={this.state.idUsuario} data={publicaciones} />
            </div>
        )
    }
}
