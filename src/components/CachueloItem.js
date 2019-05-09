import React, { Component } from 'react'
import '../styles/style.css'

export default class CachueloItem extends Component {
  render() {
    return (
      <div className="card mb-3 container" style={{width:"90%", marginTop:"3%"}} >
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src="..." class="card-img" alt="..."  />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 style={{color: "#2C47FA"}} className="card-title">{this.props.name}</h5>
              <p className="card-text">{this.props.oficio}</p>
              <p className="card-text">{this.props.info}...<small class="text-muted"></small></p>
            </div>
          </div>        
        </div>         
      </div>
    )
  }
}
