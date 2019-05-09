import React, { Component } from 'react'
import firebase from 'firebase'
import { Link } from 'react-router-dom'

export default class config extends Component {

    constructor(props) {
        super(props)
        this.state = {          
          pos: null, 
          user: null,
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
    
    renderLoginButton(){
        if(this.state.user){
          return(
            <div>
              <button className="btn btn-dark mb-2 btn-nav" onClick={this.handleLogout}>Salir</button>
              <Link to="profile"><img width="50" src={this.state.user.photoURL} alt={this.state.user.displayName}/></Link>
              {/* <p>Hola {this.state.user.displayName}!</p> */}          
            </div>
            );
        }else{
        return(
          <button className="btn btn-dark mb-2 btn-nav" onClick={this.handleAuth}>Login Google</button> 
          );
        }
    }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}
