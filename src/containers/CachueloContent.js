import React, { Component } from 'react'

import CachueloItem from '../components/CachueloItem.js'

export default class CachueloContent extends Component {  

  constructor(props){
    super(props)
  }

  mostrar() {
    return(
      this.props.data.map(res => {
        return(
          // <CachueloItem name={res.name} oficio={res.category} info={res.release_date} />
          <CachueloItem idPublicacion={res.idPublicacion}
                        titulo={res.tituloPublicacion}
                        descripcion={res.descripcionPublicacion}
                        habilidades={res.habilidadesPublicacion}
                        estado={res.estadoPublicacion}
                        fecha={res.fechaPublicacion}
                        usuario={res.usuario}
                        distrito={res.distrito}                        
                        oficio={res.oficio.idOficio}
                        idUsuarioActual={this.props.idUsuario}
          />
        )
      })
    )
  }

  render() {
    let rows = []

    if(this.props.filter != null && this.props.data != null){
      this.props.data.forEach((res) => {
          let filter = this.props.filter

          if(res.oficio.nombreOficio.toLowerCase().indexOf(filter) > -1) {
              rows.push(<CachueloItem idPublicacion={res.idPublicacion}
                                      titulo={res.tituloPublicacion}
                                      descripcion={res.descripcionPublicacion}
                                      habilidades={res.habilidadesPublicacion}
                                      estado={res.estadoPublicacion}
                                      fecha={res.fechaPublicacion}
                                      usuario={res.usuario}
                                      distrito={res.distrito}                        
                                      oficio={res.oficio}
                                      idUsuarioActual={this.props.idUsuario}
              />)
          }
      })

    } else if(this.props.data != null) {

        this.props.data.forEach((res) => {
            console.log(res)
            rows.push(<CachueloItem idPublicacion={res.idPublicacion}
                                    titulo={res.tituloPublicacion}
                                    descripcion={res.descripcionPublicacion}
                                    habilidades={res.habilidadesPublicacion}
                                    estado={res.estadoPublicacion}
                                    fecha={res.fechaPublicacion}
                                    usuario={res.usuario}
                                    distrito={res.distrito}                        
                                    oficio={res.oficio}
                                    idUsuarioActual={this.props.idUsuario}
             />)            
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
