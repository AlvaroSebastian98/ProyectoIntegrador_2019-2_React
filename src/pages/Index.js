import React, { Component } from 'react'

import SearchBarIndex from '../components/SearchBarIndex'
import CachueloContent from '../containers/CachueloContent.js'
import img from "../img/profesionistas.jpg"
import axios from 'axios'

import firebase from 'firebase'

export default class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      publicaciones: [],
      pos: null,
      usuarios: [],
      user: null
    };

    this.guardarIdUsuario = this.guardarIdUsuario.bind(this);
  }

  componentWillMount() {

    axios.get('https://service-project.herokuapp.com/api/usuarios')
    .then(res => {
      this.setState({ usuarios: res.data })

      firebase.auth().onAuthStateChanged(user =>{
        this.setState({user});
      });
    });

    axios.get('https://service-project.herokuapp.com/api/publicaciones')
      .then(res => {
        this.setState({ publicaciones: res.data })
    });

  }

  guardarIdUsuario() {
    let idUsuario

    this.state.usuarios.forEach(usuario => {          
      if(usuario.idFirebase === this.state.user.uid) {                      
          idUsuario = usuario.idUsuario
      }
    })
    return idUsuario
  }

  render() {
    let idUsuario

    if(this.state.user != null) {
      // if(this.state.user){      
        idUsuario = this.guardarIdUsuario()
      // }
    }    

    let publicaciones = []

    this.state.publicaciones.forEach(publicacion => {
      if(publicacion.disponibilidadPublicacion == true) {
          publicaciones.push(publicacion)
      }
    })

    return (
      <div>
        <div style={{display: "flex", backgroundColor:"#ffffff"}}>
          <img width="50%" height="59%" src={img}/>
          <div style={{}}>
            <h2 style={{marginTop: "10%", textAlign:"center"}}>Cachuelitos</h2>
            <h2 >Consigue más rápido tus trabajos con nosotros</h2>
          </div>
        </div>        
        <SearchBarIndex idUsuario={idUsuario}/>
        <CachueloContent idUsuario={idUsuario} data={publicaciones}/>
      </div>
    )
  }
}
