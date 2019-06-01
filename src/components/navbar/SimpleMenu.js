import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { Link } from 'react-router-dom'

function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <Button
        aria-owns={anchorEl ? 'simple-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        {/* Open Menu */}
        <img style={{borderRadius:"30px"}} width="45" src={props.photo}/>
      </Button>
      <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {/* <Button style={{marginRight:"15px"}} color="primary" variant="contained" onClick={this.handleLogout}>Salir</Button> */}
        <Link to={props.showProfile}><MenuItem onClick={handleClose}>Profile</MenuItem></Link>
        {/* <MenuItem onClick={}>My account</MenuItem> */}
        {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
        <MenuItem onClick={props.handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default SimpleMenu;
