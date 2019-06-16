import React, { Component } from 'react'
// import data from '../firebase/Config'

import TypographyMenu from '../components/TypographyMenu'
import ProfileInformation from '../components/profile/ProfileInformation'
import ProfilePublications from '../components/profile/ProfilePublications'

import { BrowserRouter as Router, Route, IndexRouter, hashHistory} from 'react-router-dom';

import axios from 'axios'

export default class Profile extends Component {

  constructor(props) {
    super(props)
    const { params } = this.props.match
    this.state = {
      id: params.id,
      username: params.username,
      email: params.email,
      // photo: "https://"+params.photo.replace(/,/g,"/")
      photo: ''
    }
  }

  componentWillMount() {    
    axios.get('https://service-project.herokuapp.com/api/usuario/'+this.state.id)
        .then(res => {
          this.setState({ photo: res.data.fotoUsuario })
          console.log(res.data)
    });
  }

  render() {
    console.log(this.state.id)
    console.log(this.state.username)
    console.log(this.state.email)
    console.log(this.state.photo)
    return (
      <Router>        
        {/* <div className="container" style={{backgroundColor:"#ffffff", width:"100%"}}>
          <strong><p style={{float: "right"}}>Alvaro Mañuico</p></strong> */}
        <div style={{width:"100%"}}>
          <div style={{float:"left", width:"25%", backgroundColor:"white", textAlign:"center"}}>
            <img style={{marginTop:"40px"}} width="220" src={this.state.photo}/>
            <div style={{marginLeft:"45px", marginTop:"50px"}}>
              <TypographyMenu
                  id={this.state.id} 
                  username={this.state.username}
                  email={this.state.email}/>
            </div>
          </div>
          <div style={{float:"right", width:"70%", backgroundColor:"white"}}>                        
            {/* <Route path='/profile/profileInformation/:id/:username/:email' component={ ProfileInformation } /> */}
            <Route path='/profile/profileInformation/:id' component={ ProfileInformation } />
            <Route path='/profile/profilePublications/:id' component={ ProfilePublications } />
            <Route path='/profile/profileClients/:id' component={ ProfileInformation } />
                        
          </div>
        </div> 
        {/* </div>  */}
               
      </Router>
    )
  }
}
