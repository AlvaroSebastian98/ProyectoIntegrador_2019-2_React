import React, { Component } from 'react'

import axios from 'axios'

import Button from '@material-ui/core/Button';
import 'bootstrap/dist/css/bootstrap.css';

import Switch from '@material-ui/core/Switch';
//import MultipleSelect from './IntegrationReactSelect'
// import RadioButtons from '../RadioButtons'
// import Radio from '@material-ui/core/Radio';



export default class ProfileInformation extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            usuario_logeado: [],
            usuarios: [],
            distritos: [],
            oficios: [],

            selectedDistrito: false,
            selectedOficio1: false,
            selectedOficio2: false,
            selectedOficio3: false,

            cb1: false,
            cb2: false,
            
            p: "",
            id_usuario: "",
            id_firebase: "",
            nombre: "",
            telefono: "",
            id_oficio1:1,
            id_oficio2:1,
            id_oficio3:1,
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
        this.cambioEstado = this.cambioEstado.bind(this);
        this.cambioDisponibilidad = this.cambioDisponibilidad.bind(this);
        this.cambioDescripcion = this.cambioDescripcion.bind(this);
        this.cambioHorarios = this.cambioHorarios.bind(this);
        this.cambioDistrito = this.cambioDistrito.bind(this);  
        this.cambioOficio1 = this.cambioOficio1.bind(this);
        this.cambioOficio2 = this.cambioOficio2.bind(this);
        this.cambioOficio3 = this.cambioOficio3.bind(this);      

        this.registrarDataUsuario = this.registrarDataUsuario.bind(this);
        this.registrarDataTrabajador = this.registrarDataTrabajador.bind(this);
    }

    componentWillMount() {
        axios.get('https://service-project.herokuapp.com/api/distritos')
        .then(res => {
          this.setState({ distritos: res.data })
        });

        axios.get('https://service-project.herokuapp.com/api/oficios')
        .then(res => {
          this.setState({ oficios: res.data })
        });

        axios.get('https://service-project.herokuapp.com/api/usuarios')
        .then(res => {
          this.setState({ usuarios: res.data })                                
        });

        const { params } = this.props.match
        
        axios.get('https://service-project.herokuapp.com/api/usuario/'+params.id)
        .then(res => {
                console.log(res.data.ditrito)
                console.log(res.data)          
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

                cb1: res.data.estadoUsuario,
                cb2: res.data.disponibilidadUsuario,

                disponibilidad: res.data.disponibilidadUsuario,
                descripcion: res.data.descripcionUsuario,
                horarios: res.data.horariosUsuario,
                id_distrito: res.data.distrito.idDistrito,
                id_oficio1: res.data.oficio1.idOficio,
                id_oficio2: res.data.oficio2.idOficio,
                id_oficio3: res.data.oficio3.idOficio
            })

        });
        
    }

    cambioTelefono(e) {
        this.setState( {
            telefono: e.target.value,            
        })
    }
    
    cambioEstado(e) {
        this.setState( {
            estado: !this.state.cb1,
            cb1: !this.state.cb1
        })
        console.log("Estado: "+e.target.value)
        setTimeout(()=> {
            console.log("Estado: "+this.state.estado)
        }, 500) 
    }

    cambioDisponibilidad(e) {
        this.setState( {
            disponibilidad: !this.state.cb2,
            cb2: !this.state.cb2
        })        

        console.log("Disponibilidad: "+e.target.value)
        setTimeout(()=> {
            console.log("Disponibilidad: "+this.state.disponibilidad)
        }, 500) 
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

    cambioOficio1(e) {
        this.setState( {
            id_oficio1: e.target.value
        })
    }

    cambioOficio2(e) {
        this.setState( {
            id_oficio2: e.target.value
        })
    }

    cambioOficio3(e) {
        this.setState( {
            id_oficio3: e.target.value
        })
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
            "descripcionUsuario": this.state.descripcion,
            "horariosUsuario": this.state.horarios,
            "distrito": {
                "idDistrito": this.state.id_distrito,
            },
            "oficio1": {
                "idOficio": this.state.id_oficio1,
            },
            "oficio2": {
                "idOficio": this.state.id_oficio2,
            },
            "oficio3": {
                "idOficio": this.state.id_oficio3,
            },
        }
        console.log(datos)                           

        axios.put('https://service-project.herokuapp.com/api/usuario/'+this.state.id_usuario+'/', datos )
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

    registrarDataTrabajador(e) {
        e.preventDefault();
        console.log("registro trabajador")
        
        let datos = {
            "idFirebase": this.state.id_firebase,
            "nombreUsuario": this.state.nombre,
            "telefonoUsuario": this.state.telefono,
            "emailUsuario": this.state.email,
            "estadoUsuario": this.state.estado,
            "disponibilidadUsuario": this.state.disponibilidad,
            "descripcionUsuario": this.state.descripcion,
            "horariosUsuario": this.state.horarios,
            "distrito": {
                "idDistrito": this.state.id_distrito,
            },
            "oficio1": {
                "idOficio": this.state.id_oficio1,
            },
            "oficio2": {
                "idOficio": this.state.id_oficio2,
            },
            "oficio3": {
                "idOficio": this.state.id_oficio3,
            },
        }
        console.log(datos)                           

        axios.put('https://service-project.herokuapp.com/api/usuario/'+this.state.id_usuario+'/', datos )
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
                                if(this.state.id_distrito == distrito.idDistrito) {
                                    this.state.selectedDistrito = true
                                } else {
                                    this.state.selectedDistrito = false
                                }                               
                                return(
                                    <option selected={this.state.selectedDistrito} 
                                            value={distrito.idDistrito}>
                                        {distrito.nombreDistrito}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlSelect1">Número</label>
                        <input maxLength="9" onChange={this.cambioTelefono}
                                value={this.state.telefono} type="number" className="form-control" style={{width:"30%"}}/>
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
                    Deseo trabajar                                      
                    <Switch
                        checked={this.state.cb1}
                        onChange={this.cambioEstado}                                                
                    />
                    <div className="form-group">
                        <label>Oficio 1</label>
                        <select onChange={this.cambioOficio1} className="form-control" style={{width:"30%"}}>
                            {this.state.oficios.map(oficio => {
                                if(this.state.id_oficio1 == oficio.idOficio) {
                                    this.state.selectedOficio1 = true
                                } else {
                                    this.state.selectedOficio1 = false
                                }
                                return(
                                    <option selected={this.state.selectedOficio1}
                                            value={oficio.idOficio}>
                                            {oficio.nombreOficio}
                                    </option>
                                )
                            })}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Oficio 2</label>
                        <select onChange={this.cambioOficio2} className="form-control" style={{width:"30%"}}>
                            {this.state.oficios.map(oficio => {
                                if(this.state.id_oficio2 == oficio.idOficio) {
                                    this.state.selectedOficio2 = true
                                } else {
                                    this.state.selectedOficio2 = false
                                }
                                return(
                                    <option selected={this.state.selectedOficio2}
                                            value={oficio.idOficio}>
                                            {oficio.nombreOficio}
                                    </option>
                                )
                            })}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Oficio 3</label>
                        <select onChange={this.cambioOficio3} className="form-control" style={{width:"30%"}}>
                            {this.state.oficios.map(oficio => {
                                if(this.state.id_oficio3 == oficio.idOficio) {
                                    this.state.selectedOficio3 = true
                                } else {
                                    this.state.selectedOficio3 = false
                                }
                                return(
                                    <option selected={this.state.selectedOficio3}
                                            value={oficio.idOficio}>
                                            {oficio.nombreOficio}
                                    </option>
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
                    <br/>  
                    Estoy disponible
                    <Switch
                        checked={this.state.cb2}
                        onChange={this.cambioDisponibilidad}                                                
                    />
                    <br/>
                    <Button style={{marginRight:"15px"}} 
                            color="primary" 
                            variant="contained" 
                            onClick={this.registrarDataTrabajador}>
                        Guardar
                    </Button>
                </form>              
            </div>
        )
    }
}
