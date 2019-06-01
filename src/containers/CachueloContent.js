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
    let rows = []

    if(this.props.filter != null && this.props.data != null){
      this.props.data.forEach((res) => {
          let filter = this.props.filter

          if(res.name.toLowerCase().indexOf(filter) > -1) {
              rows.push(<CachueloItem name={res.name} oficio={res.category} 
                info={res.release_date} />)
          }
      })

    } else if(this.props.data != null) {

        this.props.data.forEach((res) => {
            console.log(res)
            rows.push(<CachueloItem name={res.name} oficio={res.category} 
              info={res.release_date} />)            
        })

    } else {
        rows.push(<h1>Loading...</h1>)
    }

    return(
      <div>
          { rows }
      </div>
    )
  }
}
