import React, { Component } from 'react'

import SearchBarIndex from '../components/SearchBarIndex'
import CachueloContent from '../containers/CachueloContent.js'
import img from "../img/profesionistas.jpg"
import axios from 'axios'

// import firebase from 'firebase'
// import { Link } from 'react-router-dom'
// import  firebaseConfig from '../firebase/Config.js'

export default class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      series: [],
      pos: null,
    };
  }

  componentWillMount() {
    axios.get('http://127.0.0.1:8000/series')
    .then(res => {
      this.setState({ series: res.data })
    });

  }

  render() {
    return (
      <div>        
        <div style={{display: "flex", backgroundColor:"#ffffff"}}>
          <img width="50%" height="59%" src={img}/>
          <div style={{}}>
            <h2 style={{marginTop: "10%", textAlign:"center"}}>Cachuelitos</h2>
            <h2 >Consigue más rápido tus trabajos con nosotros</h2>
          </div>
        </div>        
        <SearchBarIndex/>
        <CachueloContent data={this.state.series}/>
      </div>
    )
  }
}
