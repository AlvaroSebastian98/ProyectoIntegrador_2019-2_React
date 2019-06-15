import React, { Component } from 'react'

import CachueloItem from '../components/CachueloItem.js'

export default class CachueloContent extends Component {  

  mostrar() {
    return(
      this.props.data.map(res => {
        return(
          // <CachueloItem name={res.name} oficio={res.category} info={res.release_date} />
          <CachueloItem titulo={res.tituloPublicacion}
                        descripcion={res.descripcionPublicacion}
                        habilidades={res.habilidadesPublicacion}
                        estado={res.estadoPublicacion}
                        fecha={res.fechaPublicacion}
                        usuario={res.usuario}
                        distrito={res.distrito}                        
                        oficio={res.oficio.idOficio}
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
              rows.push(<CachueloItem titulo={res.tituloPublicacion}
                                      descripcion={res.descripcionPublicacion}
                                      habilidades={res.habilidadesPublicacion}
                                      estado={res.estadoPublicacion}
                                      fecha={res.fechaPublicacion}
                                      usuario={res.usuario}
                                      distrito={res.distrito}                        
                                      oficio={res.oficio} 
              />)
          }
      })

    } else if(this.props.data != null) {

        this.props.data.forEach((res) => {
            console.log(res)
            rows.push(<CachueloItem titulo={res.tituloPublicacion}
                                    descripcion={res.descripcionPublicacion}
                                    habilidades={res.habilidadesPublicacion}
                                    estado={res.estadoPublicacion}
                                    fecha={res.fechaPublicacion}
                                    usuario={res.usuario}
                                    distrito={res.distrito}                        
                                    oficio={res.oficio}
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
