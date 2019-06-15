import React, { Component } from 'react'

import firebase from 'firebase'
import axios from 'axios'

import SimpleMenu from '../components/navbar/SimpleMenu'

import Button from '@material-ui/core/Button';

export default class Config extends Component {

    constructor(props) {
        super(props)
        this.state = {          
          pos: null, 
          user: null,
          link: null,
          usuarios: [],
          usuario_logeado: [],
          id_firebase: '',
          id_api:'',
          nombre: '',
          email: ''
        };
        this.handleAuth = this.handleAuth.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.registrarUsuario = this.registrarUsuario.bind(this);
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
    }

    registrarUsuario() {            

      let datos = {
        "idFirebase": this.state.user.uid,
        "nombreUsuario": this.state.user.displayName,
        "emailUsuario": this.state.user.email,
      }

      new Promise((resolve, reject) => {
        let usuarios_existentes = 0

        this.state.usuarios.forEach(usuario => {
            
            if(usuario.idFirebase === this.state.user.uid) {
              usuarios_existentes += 1
            }
            console.log('API: '+usuario.idFirebase)
            console.log('Firebase: '+this.state.user.uid)
        })

        resolve(usuarios_existentes)
      })
      .then((usuarios_existentes) => {

        console.log('Hay '+usuarios_existentes+' usuarios con el mismo idFirebase')

        if(usuarios_existentes < 1) { // Nuevo usuario
            console.log('Insertando usuario')
            axios.post('https://service-project.herokuapp.com/api/usuario/', datos)
                .then(res => {
                    this.state.usuarios.push(res.data);
                    this.state.usuario_logeado.push(res.data);
                    console.log(res.data)

                }).catch((error)=>{
                    console.log(error.toString());
            });

            // return "Bienvenio "+ this.state.user.displayName
        }
        else {            
            // return "Hola de nuevo "+ this.state.user.displayName
          
          // this.state.usuarios.forEach(usuario => {
            
          //   if(usuario.idFirebase === this.state.user.uid) {
                
          //       // this.setState({id_api: usuario.idUsuario})
          //   }            
          // })
          
        }

      })
      
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

    handleAuth() {
        const provider = new firebase.auth.GoogleAuthProvider();
    
        firebase.auth().signInWithPopup(provider)
        .then(result => console.log(`${result.user.email} ha iniciado sesion`))
        .catch(error => console.log(`Error ${error.code}: ${error.message}`));
    }

    handleLogout() {
        firebase.auth().signOut()
        .then(result => console.log(`${result.user.email} ha  salido`))
        .catch(error => console.log(`Error ${error.code}: ${error.message}`));
    }

    showProfile(user, idUsuario) {   
      let photoURL = user.photoURL.split("https://").join('')
      let photo = photoURL.split('/')
      // return `profile/profileInformation/${user.uid}/${user.displayName}/${user.email}/${photo}`;
      return `profile/profileInformation/${idUsuario}/${photo}`;  
    }

  renderLoginButton(){
      if(this.state.user){

        this.registrarUsuario()
        let idUsuario = this.guardarIdUsuario()

        return(
          <div>            
            <SimpleMenu showProfile={this.showProfile(this.state.user, idUsuario)}
                        handleLogout={this.handleLogout}
                        photo={this.state.user.photoURL} />
          </div>
          );
      }else{
      return(
        <Button color="primary" variant="contained" onClick={this.handleAuth}>Iniciar sesión con google</Button>
        );
      }
  }

  userData() {
    return this.state.user
  }

  render() {
    return (
      <div>
          {/* <Link style={{float:"right"}} to="login" >Inicia sesión con Google</Link> */}
          <div style={{float:"right"}} className="App-intro">{this.renderLoginButton()}</div> 
      </div>
    )
  }
}

// function data() {
//   let user = new Config();
//   return user.userData()
// }

// export default data.bind(this)