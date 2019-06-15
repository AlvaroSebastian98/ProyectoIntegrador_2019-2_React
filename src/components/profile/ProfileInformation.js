import React, { Component } from 'react'

import axios from 'axios'

import Button from '@material-ui/core/Button';
import 'bootstrap/dist/css/bootstrap.css';

//import MultipleSelect from './IntegrationReactSelect'
import RadioButtons from '../RadioButtons'



export default class ProfileInformation extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            usuario_logeado: [],
            usuarios: [],
            distritos: [],
            oficios: ['Carpintero', 'Pintor', 'Plomero', 'Soldador'],
            
            p: "",
            id_usuario: "",
            id_firebase: "",
            nombre: "",
            telefono: "",
            oficio: "",
            email: "",
            estado: false,
            disponibilidad: false,
            descripcion: "",
            calificacion_empleado: "",
            calificacion_cliente: "",
            horarios: "",
            id_distrito: 1
        })

        this.cambioTelefono = this.cambioTelefono.bind(this);
        this.cambioOficio = this.cambioOficio.bind(this);
        this.cambioEstado = this.cambioEstado.bind(this);
        this.cambioDisponibilidad = this.cambioDisponibilidad.bind(this);
        this.cambioDescripcion = this.cambioDescripcion.bind(this);
        this.cambioHorarios = this.cambioHorarios.bind(this);
        this.cambioDistrito = this.cambioDistrito.bind(this);        

        this.registrarDataUsuario = this.registrarDataUsuario.bind(this);
    }

    componentWillMount() {
        axios.get('https://service-project.herokuapp.com/api/distritos')
        .then(res => {
          this.setState({ distritos: res.data })
        });

        axios.get('https://service-project.herokuapp.com/api/usuarios')
        .then(res => {
          this.setState({ usuarios: res.data })                                
        });

        const { params } = this.props.match
        
        axios.get('https://service-project.herokuapp.com/api/usuario/'+params.id)
        .then(res => {
          this.setState({
              usuario_logeado: res.data,

              nombre: res.data.nombreUsuario,
              email: res.data.emailUsuario,

              id_usuario: res.data.idUsuario,
              id_firebase: res.data.idFirebase,
              nombre: res.data.nombreUsuario,
              telefono: res.data.telefonoUsuario,
              email: res.data.emailUsuario,
              estado: res.data.estadoUsuario,
              disponibilidad: res.data.disponibilidadUsuario,
            //   descripcion: res.data.descripcionUsuario,
              calificacion_empleado: "",
              calificacion_cliente: "",
              horarios: res.data.horariosUsuario,
            //   id_distrito: res.data.distrito.idDistrito
          })          
        });
        
    }

    // componentWillUpdate() { // justo antes del render
    //     this.state.usuarios.forEach(usuario => {
    //         if(usuario.idFirebase == this.state.id_firebase) {
    //             this.setState({
    //                 nombre: usuario.nombreUsuario,
    //                 email: usuario.emailUsuario
    //             })
    //         }
    //     })
    // }

    // componentDidMount() {
    //     this.setState({
    //         id_firebase: params.id,
    //         nombre: params.username,
    //         email: params.email,            
    //     })
    // }

    cambioTelefono(e) {
        this.setState( {
            telefono: e.target.value,
        })
    }

    cambioOficio(e) {
        this.setState( {
            oficio: e.target.value,
        })
    }
    
    cambioEstado(e) {
        this.setState( {
            estado: e.target.value
        })
    }

    cambioDisponibilidad(e) {
        this.setState( {
            disponibilidad: e.target.value
        })
    }
    
    cambioDescripcion(e) {
        this.setState( {
            descripcion: e.target.value            
        })
    }

    cambioHorarios(e) {
        this.setState( {
            horarios: e.target.value
        })
    }
    
    cambioDistrito(e) {
        this.setState( {
            id_distrito: e.target.value
        })
        console.log("ingresado:"+e.target.value)
        setTimeout(()=> {
            console.log("estado:"+this.state.id_distrito)
        }, 500)        
    }
    
    registrarDataUsuario(e) {
        e.preventDefault();
        console.log("registro usuario")
        
        let datos = {
            "idFirebase": this.state.id_firebase,
            "nombreUsuario": this.state.nombre,
            "telefonoUsuario": this.state.telefono,
            "emailUsuario": this.state.email,
            "estadoUsuario": this.state.estado,
            "disponibilidadUsuario": this.state.disponibilidad,
            // "descripcionUsuario": this.state.descripcion,
            "calificacionEmpleado": this.state.calificacion_empleado,
            "calificacionCliente": this.state.calificacion_cliente,
            "horariosUsuario": this.state.horarios,
            "distrito": {
                "idDistrito": this.state.id_distrito
            }
        }                                
        
        // axios.post('https://service-project.herokuapp.com/api/usuario/', datos)
        //     .then(res => {
        //         this.state.usuarios.push(res.data);
        //         console.log(res.data)
        //         this.setState({usuario_logeado: res.data});

        //     }).catch((error)=>{
        //         console.log(error.toString());
        // });

        axios.put('https://service-project.herokuapp.com/api/usuario/'+this.state.idUsuario+'/', datos )
        .then(res => {
            this.state.usuario_logeado = res.data;
            console.log(res.data)
            this.setState( {
                usuario_logeado: res.data
            });
        }).catch((error)=>{
            console.log(error.toString());
        });

    
    }
    

    render() {
        
        return (
            <div style={{padding:"40px"}}>
                <form>
                    <h2>{this.state.nombre}</h2>
                    <br/>
                    <p>Email: {this.state.email}</p>
                    <div className="form-group">
                        <label for="exampleFormControlSelect1">Distrito</label>
                        <select onChange={this.cambioDistrito} className="form-control" style={{width:"30%"}}>
                            {this.state.distritos.map(distrito => {                                
                                return(
                                    <option value={distrito.idDistrito}>{distrito.nombreDistrito}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlSelect1">Número</label>
                        <input onChange={this.cambioTelefono}
                                value={this.state.telefono} type="text" className="form-control" style={{width:"30%"}}/>
                    </div>
                    <Button                            
                            style={{marginRight:"15px"}} 
                            color="primary"
                            variant="contained"
                            onClick={this.registrarDataUsuario}                            
                            >
                        Guardar
                    </Button>
                </form>
                <form style={{marginTop:"8%"}}>
                    <h4>¿Quieres trabajar?</h4>
                    <br/>                    
                    <RadioButtons 
                        onChange={this.cambioEstado} 
                        value={this.state.estado}
                    />
                    <div className="form-group">
                        <label for="exampleFormControlSelect1">Oficios</label>
                        <select onChange={this.cambioOficio} className="form-control" style={{width:"30%"}}>
                            {this.state.oficios.map(oficio => {
                                return(
                                    <option value={oficio.idOficio}>{oficio}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlSelect1">Horarios</label>
                        <input 
                                onChange={this.cambioHorarios} 
                                value={this.state.horarios} 
                                type="text" 
                                className="form-control" 
                                style={{width:"30%"}}/>
                    </div>
                    <div class="form-group">
                        <label>Alguna descripción</label>
                        <textarea 
                                onChange={this.cambioDescripcion}
                                value={this.state.descripcion}
                                style={{width:"50%"}}
                                class="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"></textarea>
                    </div>
                    ¿ Disponible ?
                    <RadioButtons 
                        onChange={this.cambioDisponibilidad} 
                        value={this.state.disponibilidad}
                    />
                    <br/>
                    <Button style={{marginRight:"15px"}} color="primary" variant="contained" onClick={this.registrarUsuario}>Guardar</Button>
                </form>              
            </div>
        )
    }
}
