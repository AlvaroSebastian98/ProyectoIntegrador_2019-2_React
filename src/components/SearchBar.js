import React, { Component } from 'react'

export default class SearchBar extends Component {
  render() {
    return (
      <div className="gradient"
         style={{width:"100%", 
          padding:"1%",
          textAlign:"center",           
          marginBottom:"2%"}}>
        <h3 style={{marginBottom:"2%"}}>Escoje un cachuelo!</h3>
        <div style={{width:"100%"}}>
          <form className="form-inline padre" >
            <div className="form-group mb-2 hijo">
              <label for="staticEmail2" class="sr-only">Cachuelo</label>
              <select className="form-control" name="cachuelos">
                <option disabled>Tipo de cachuelo</option>
                <option>Carpintero</option>
                <option>Pintor</option>
                <option>Vidriero</option>
                <option>Profesor particular</option>
              </select>
            </div>
            <div class="form-group mx-sm-3 mb-2 hijo">
              <label for="inputPassword2" class="sr-only">Distrito</label>
              <select className="form-control" name="distritos">
                <option disabled>Distrito</option>
                <option>San Juan de Miraflores</option>
                <option>Surco</option>
                <option>San Martin de Porres</option>
                <option>Miraflores</option>
                <option>Villa el Salvador</option>
              </select>
            </div>
            <div className="hijo">
              <button type="submit" class="btn btn-dark mb-2">Buscar</button>
            </div>            
          </form>
        </div>
      </div>
      
    )
  }
}
