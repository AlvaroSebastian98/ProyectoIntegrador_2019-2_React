import React, { Component } from 'react'

import CachueloItem from '../components/CachueloItem.js'

export default class CachueloContent extends Component {

  mostrar() {
    return(
      this.props.data.map(res => {
        return(
          <CachueloItem name={res.name} oficio={res.category} info={res.release_date} />
        )
      })
    )
  }

  render() {
    return (
      <div>
        {this.mostrar()}
      </div>
    )
  }
}
