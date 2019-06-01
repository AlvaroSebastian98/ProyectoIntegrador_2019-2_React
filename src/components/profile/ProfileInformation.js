import React, { Component } from 'react'

import axios from 'axios'

import Button from '@material-ui/core/Button';
import 'bootstrap/dist/css/bootstrap.css';

//import MultipleSelect from './IntegrationReactSelect'
import RadioButtons from '../RadioButtons'



export default class ProfileInformation extends Component {

    constructor(props) {
        super(props)
        this.state = ({
            distritos: [],
            oficios: ['Carpintero', 'Pintor', 'Plomero', 'Soldador']
        })
    }

    componentWillMount() {
        axios.get('http://localhost:8089/api/distritos')
        .then(res => {
          this.setState({ distritos: res.data })
        });
    }
    
    registrarUsuario() {
        
    }

    render() {
        const { params } = this.props.match
        return (
            <div style={{padding:"40px"}}>
                <form>
                    <h2>{params.username}</h2>
                    <br/>
                    <p>Email: {params.email}</p>
                    <div className="form-group">
                        <label for="exampleFormControlSelect1">Distrito</label>
                        <select className="form-control" style={{width:"30%"}}>
                            {this.state.distritos.map(distrito => {
                                return(
                                    <option value={distrito.idDistrito}>{distrito.nombreDistrito}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlSelect1">Número</label>
                        <input type="text" className="form-control" style={{width:"30%"}}/>
                    </div>
                    <Button style={{marginRight:"15px"}} color="primary" variant="contained" onClick={this.registrarUsuario}>Guardar</Button>
                </form>
                <form style={{marginTop:"8%"}}>
                    <h4>¿Quieres trabajar?</h4>
                    <br/>                    
                    <RadioButtons />
                    <div className="form-group">
                        <label for="exampleFormControlSelect1">Oficios</label>
                        <select className="form-control" style={{width:"30%"}}>
                            {this.state.oficios.map(oficio => {
                                return(
                                    <option value={oficio.idOficio}>{oficio}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlSelect1">Horarios</label>
                        <input type="text" className="form-control" style={{width:"30%"}}/>
                    </div>
                    <div class="form-group">
                        <label>Alguna descripción</label>
                        <textarea style={{width:"50%"}} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    ¿ Disponible ?
                    <RadioButtons />
                    <br/>
                    <Button style={{marginRight:"15px"}} color="primary" variant="contained" onClick={this.registrarUsuario}>Guardar</Button>
                </form>              
            </div>
        )
    }
}
