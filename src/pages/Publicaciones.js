import React, { Component } from 'react'

import SearchBar from '../components/SearchBar'

import CachueloContent from '../containers/CachueloContent.js'

import axios from 'axios'

export default class Publicaciones extends Component {

    constructor(props) {
        super(props)
        this.state = {
          series: [],
          pos: null,
          filter: null
        };
    }
    
    componentWillMount() {
        axios.get('http://127.0.0.1:8000/series')
        .then(res => {
          this.setState({ series: res.data })
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
            <div>
               <SearchBar onChange={ this.filterList.bind(this) }/>
               <CachueloContent filter={ this.state.filter } data={this.state.series}/>
            </div>
        )
    }
}
