import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';

export default class SearchBar extends Component {
    render() {
        return (
            <div 
                style={{
                padding:"1%",                          
                marginBottom:"2%",
                height:"60px"}}>
                <h5 style={{float:"left"}}>Escoje un oficio</h5>
                <form className="form-inline padre" >
                <input type="text" style={{width:"60%"}} className="form-control" onChange={this.props.onChange} placeholder="BUSCAR POR OFICIO"/>  
                    {/* <div className="form-group mb-2 hijo">
                        <input  style={{float:"left"}} type="text" placeholder="BUSCAR POR OFICIO" />                         
                    </div>  */}
                </form>             
            </div>
        )
    }
}
