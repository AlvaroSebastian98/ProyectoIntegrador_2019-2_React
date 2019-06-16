import React, { Component } from 'react'

import SearchBar from '../components/SearchBar'

import CachueloContent from '../containers/CachueloContent.js'

import axios from 'axios'

export default class Publicaciones extends Component {

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

    filterList(ev) {
        let filter = ev.target.value.toLowerCase()        
        this.setState({
            filter: filter
        })
    }

    render() {
        return (
            <div style={{height:"1000px"}}>
               <SearchBar onChange={ this.filterList.bind(this) }/>
               <CachueloContent idUsuario={this.state.idUsuario} 
                                filter={ this.state.filter }
                                data={this.state.publicaciones}/>
            </div>
        )
    }
}
