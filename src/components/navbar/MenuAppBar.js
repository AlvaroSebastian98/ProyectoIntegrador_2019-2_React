import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import firebase from 'firebase'
import axios from 'axios'

import SimpleMenu from './SimpleMenu'

import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom'

class MenuAppBar extends Component {

  constructor(props) {
    super(props)
    this.state = ({
      pos: null, 
      user: null,
      link: null,
      usuarios: [],
      usuario_logeado: [],
      id_firebase: '',
      id_api:'',
      nombre: '',
      email: ''
    })

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

        
      }

    })
    
  }

  guardarIdUsuario() {
    let idUsuario

    this.state.usuarios.forEach(usuario => {          
      if(usuario.idFirebase === this.state.user.uid) {                      
          idUsuario = usuario.idUsuario
          console.log(this.state.user.uid)
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
    return `/profile/profileInformation/${idUsuario}/${photo}`;  
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

  render() {
    const { classes } = this.props;

    let idUsuario
    if(this.state.user) {
      idUsuario = this.guardarIdUsuario()
    }   

    return (
      <div className={classes.root}>
        <AppBar position="static" style={{width:"100%"}}>
          <Toolbar>
            <IconButton style={{marginRight:"2%"}} className={classes.menuButton} edge="start" color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title} style={{color:"white"}}>            
              <Link to="/" className="navbar-brand" style={{color:"white"}}>            
                  CACHUELITOS
              </Link>               
            </Typography>            
              <Link to={`/publicaciones/${idUsuario}`} style={{marginRight:"2%", color:"white"}}>Ver trabajos</Link>
              <Link style={{marginRight:"2%", color:"white"}}>Ver trabajadores</Link>
              <Link to={`/contratar/${idUsuario}`} style={{marginRight:"2%", color:"white"}}>Contratar</Link>             
              <div style={{float:"right"}}>
                  {this.renderLoginButton()}
              </div>            
          </Toolbar>
        </AppBar>
      </div>
    );
  }
    
}

const styles = {
  root: {
      flexGrow: 1,
      spacing: 2,
  },
  grow: {
      flexGrow: 1,
  },
  menuButton: {
      marginLeft: -12,
      marginRight: 20,
  },
  title: {
    flexGrow: 1,
  },
};

export default withStyles(styles)(MenuAppBar);
