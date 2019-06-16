import React, { Component } from 'react'

import axios from 'axios'

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class ContratarFormulario extends Component {

  constructor(props) {
    super(props)
    this.state = ({
      distritos: [],
      oficios: [],
      id_usuario:'',      
      titulo:'',
      telefono:'',
      oficio:'',
      distrito:'',
      habilidades:'',
      descripcion:''
    })
    
    this.cambioTitulo = this.cambioTitulo.bind(this);
    this.cambioTelefono = this.cambioTelefono.bind(this);
    this.cambioOficio = this.cambioOficio.bind(this);
    this.cambioDistrito = this.cambioDistrito.bind(this);
    this.cambioHabilidades = this.cambioHabilidades.bind(this);
    this.cambioDescripcion = this.cambioDescripcion.bind(this);

    this.publicar = this.publicar.bind(this);
  }

  componentWillMount() {
    const { params } = this.props.match

    this.setState({
      id_usuario: params.id
    })

    axios.get('https://service-project.herokuapp.com/api/distritos')
      .then(res => {
        this.setState({ distritos: res.data })
    });

    axios.get('https://service-project.herokuapp.com/api/oficios')
      .then(res => {
        this.setState({ oficios: res.data })
    });

  }

  cambioTitulo(e) {
    this.setState( {
        titulo: e.target.value,
    })
  }

  cambioTelefono(e) {
      this.setState( {
          telefono: e.target.value,
      })
  }
  
  cambioOficio(e) {
      this.setState( {
          oficio: e.target.value
      })
  }

  cambioDistrito(e) {
      this.setState( {
          distrito: e.target.value
      })
      console.log("Distrito: "+this.state.distrito)
  }
  
  cambioHabilidades(e) {
      this.setState( {
          habilidades: e.target.value            
      })
  }

  cambioDescripcion(e) {
      this.setState( {
          descripcion: e.target.value
      })
  }

  publicar(e) {
    e.preventDefault();

    // let d = new Date();

    let datos = {
      "tituloPublicacion": this.state.titulo,
      "descripcionPublicacion": this.state.descripcion,
      "emailPublicacion": '',
      "telefonoPublicacion": this.state.telefono,
      "habilidadesPublicacion": this.state.habilidades,
      "estadoPublicacion": true,
      //2010-01-12 10:50:43
      // "fechaPublicacion": `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} `+
      //                     `${d.getHours()}:${d.getMinutes()}:${d.getMilliseconds()}`,      
      "usuario": {
        "idUsuario": this.state.id_usuario
      },
      "distrito": {
        "idDistrito": this.state.distrito
      },
      "oficio": {
        "idOficio": this.state.oficio
      }
    }
    console.log(datos)

    axios.post('https://service-project.herokuapp.com/api/publicacion', datos )
      .then(res => {
          this.state.usuario_logeado = res.data;
          console.log(res.data)
          window.location="/";
          // this.setState( {
          // });
      }).catch((error)=>{
          console.log(error.toString());
    });
  }

  render() {
    return (
      <div style={{height:"40em"}} fixed className="container">        
        <form autoComplete="off">
          <TextField
            id="standard-name"
            label="Título de la publicación"
            value={this.state.titulo}
            onChange={this.cambioTitulo}
            margin="normal"
            style={{marginRight:"5%", width:"45%"}}
          />

          <TextField
            id="standard-name"
            label="Teléfono"
            value={this.state.telefono}
            onChange={this.cambioTelefono}
            margin="normal"
            style={{width:"45%"}}
          />
          
          <TextField
            id="standard-select-currency"
            select
            label="Oficio"
            value={this.state.oficio}
            onChange={this.cambioOficio}
            // SelectProps={{
            //   MenuProps: {
            //     className: classes.menu,
            //   },
            // }}
            helperText="Elige el tipo de oficio requerido"
            margin="normal"
            style={{marginRight:"5%", width:"45%"}}
          >
            {this.state.oficios.map(oficio => (
              <MenuItem key={oficio.idOficio} value={oficio.idOficio}>
                {oficio.nombreOficio}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="standard-select-currency"
            select
            label="Distrito"
            value={this.state.distrito}
            onChange={this.cambioDistrito}
            // SelectProps={{
            //   MenuProps: {
            //     // className: classes.menu,
            //   },
            // }}
            helperText="Elige el distrito del trabajo"
            margin="normal"
            style={{width:"45%"}}
            
          >
            {this.state.distritos.map(distrito => (
              <MenuItem key={distrito.idDistrito} value={distrito.idDistrito}>
                {distrito.nombreDistrito}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="standard-multiline-static"
            label="Habilidades necesarias"
            value={this.state.habilidades}
            onChange={this.cambioHabilidades}
            multiline
            rows="4"
            // defaultValue="Default Value"
            margin="normal"
            style={{marginRight:"5%", width:"45%"}}
          />

          <TextField
            id="standard-multiline-static"
            label="Descripción del cachuelo"
            value={this.state.descripcion}
            onChange={this.cambioDescripcion}
            multiline
            rows="4"
            // defaultValue="Default Value"
            margin="normal"
            style={{width:"45%"}}
          />

          <Button 
            color="primary" 
            variant="contained"
            style={{marginTop:"16%"}}
            onClick={this.publicar}
          >
            Publicar
          </Button>
        </form>          
      </div>
    )
  }
}
