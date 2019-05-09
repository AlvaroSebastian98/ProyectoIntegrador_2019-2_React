import React, { Component } from 'react'

import Nav from '../components/Nav.js'
import SearchBar from '../components/SearchBar'
import CachueloContent from '../containers/CachueloContent.js'
import img from "../img/profesionistas.jpg"
import axios from 'axios'
import firebase from 'firebase'
import { Link } from 'react-router-dom'
import  firebaseConfig from '../firebase/config.js'

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
        <Nav/>
        <div style={{justifyContent: "center", display: "flex", backgroundColor:"#ffffff"}}>
          <img src={img}/>
        </div>        
        <SearchBar/>
        <CachueloContent data={this.state.series}/>
      </div>
    )
  }
}
