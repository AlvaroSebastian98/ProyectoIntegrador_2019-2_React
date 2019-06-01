import React, { Component } from 'react'
import firebase from 'firebase'
// import { Link } from 'react-router-dom'
// import MenuAppBar from '../components/navbar/MenuAppBar'

import SimpleMenu from '../components/navbar/SimpleMenu'

import Button from '@material-ui/core/Button';

export default class Config extends Component {

    constructor(props) {
        super(props)
        this.state = {          
          pos: null, 
          user: null,
          link: null
        };
        this.handleAuth = this.handleAuth.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(user =>{
            this.setState({user});
        });
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

    showProfile(user) {   
      let photoURL = user.photoURL.split("https://").join('')
      let photo = photoURL.split('/')
      // let count = this.deleteAndCount(photo)
      return `profile/profileInformation/${user.uid}/${user.displayName}/${user.email}/${photo}`;  
    }

    // deleteAndCount(photo) {
    //   let count = []
    //   photo.forEach(el => {
    //     count.push(el.length)
    //   });
    //   return count
    // }

  imprimir(user) {
    console.log(user)
  }

    renderLoginButton(){
      if(this.state.user){
        return(
          <div>
            <SimpleMenu showProfile={this.showProfile(this.state.user)} handleLogout={this.handleLogout} photo={this.state.user.photoURL} />
            {/* <MenuAppBar showProfile={this.showProfile(this.state.user)} handleLogout={this.handleLogout} photo={this.state.user.photoURL}/> */}
            {/* <Button style={{marginRight:"15px"}} color="primary" variant="contained" onClick={this.handleLogout}>Salir</Button> */}
            {/* <Link onClick={()=>this.imprimir(this.state.user)} to={this.showProfile(this.state.user)}><img style={{borderRadius:"30px"}} width="50" src={this.state.user.photoURL} alt={this.state.user.displayName}/></Link> */}
            {/* <img style={{borderRadius:"30px"}} width="50" src={this.state.user.photoURL} alt={this.state.user.displayName}/> */}
            {/* <Link to='profile/'><img style={{borderRadius:"30px"}} width="50" src={this.state.user.photoURL} alt={this.state.user.displayName}/></Link> */}
            {/* <p>Hola {this.state.user.displayName}!</p> */}
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