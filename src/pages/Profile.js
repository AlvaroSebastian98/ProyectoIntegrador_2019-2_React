import React, { Component } from 'react'
import Nav from '../components/Nav'

export default class Profile extends Component {
  render() {
    return (
      <div>
        <Nav/>
        <div className="container" style={{backgroundColor:"#ffffff", width:"100%"}}>
          <strong><p style={{float: "right"}}>Alvaro Mañuico</p></strong>

        </div>        
      </div>
    )
  }
}
