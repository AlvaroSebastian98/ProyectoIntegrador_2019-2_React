import React, { Component } from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import 'bootstrap/dist/css/bootstrap.css';

import axios from 'axios'

// import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    width: 500,    
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

// const currencies = [
//   {
//     value: 'USD',
//     label: '$',
//   },
//   {
//     value: 'EUR',
//     label: '€',
//   },
//   {
//     value: 'BTC',
//     label: '฿',
//   },
//   {
//     value: 'JPY',
//     label: '¥',
//   },
// ];

function Form(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
    distrito: 1 //id del distrito que se mostrará por defecto
  }); 

  const distritos = props.distritos.map(distrito => (
    {
      value: distrito.idDistrito,
      label: distrito.nombreDistrito
    }
  ))        

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div style={{height:"40em"}} fixed className="container">
        <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="standard-name"
        label="Título de la publicación"
        className={classes.textField}
        // value={values.name}
        // onChange={handleChange('name')}
        margin="normal"
        style={{marginRight:"5%"}}
      />

      <TextField
        id="standard-name"
        label="Teléfono"
        className={classes.textField}
        // value={values.name}
        // onChange={handleChange('name')}
        margin="normal"
      />
      
      <TextField
        id="standard-select-currency"
        select
        label="Oficio"
        className={classes.textField}
        // value={values.currency}
        onChange={handleChange('currency')}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        helperText="Elige el tipo de oficio requerido"
        margin="normal"
        style={{marginRight:"5%"}}
      >
        {props.distritos.map(distrito => (
          <MenuItem key={distrito.idDistrito} value={distrito.idDistrito}>
            {distrito.nombreDistrito}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        id="standard-select-currency"
        select
        label="Distrito"
        className={classes.textField}
        value={values.distrito}
        onChange={handleChange('distrito')}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        helperText="Elige el distrito del trabajo"
        margin="normal"
        
      >
        {props.distritos.map(distrito => (
          <MenuItem key={distrito.idDistrito} value={distrito.idDistrito}>
            {distrito.nombreDistrito}
          </MenuItem>
        ))}
      </TextField>



      {/* <TextField
        id="standard-select-currency"
        select
        label="Select"
        className={classes.textField}
        value={values.currency}
        onChange={handleChange('currency')}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        helperText="Please select your currency"
        margin="normal"
      >
        {currencies.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField> */}




      <TextField
        id="standard-multiline-static"
        label="Habilidades necesarias"
        multiline
        rows="4"
        // defaultValue="Default Value"
        className={classes.textField}
        margin="normal"
        style={{marginRight:"5%"}}
      />

      <TextField
        id="standard-multiline-static"
        label="Descripción del cachuelo"
        multiline
        rows="4"
        // defaultValue="Default Value"
        className={classes.textField}
        margin="normal"
      />

      <Button 
        color="primary" 
        variant="contained"
        style={{marginTop:"16%"}}
      >
        Publicar
      </Button>
    </form>
    </div>    
  );
}

export default Form;
