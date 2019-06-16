import React from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import AccessibilityNew from '@material-ui/icons/AccessibilityNew';
import SendIcon from '@material-ui/icons/Send';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    width: 230,
  },
});

function TypographyMenu(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <MenuList>
        <Link to={`/profile/profileInformation/${props.id}`}>
          <MenuItem>
            <ListItemIcon>            
              <AccountCircle />
            </ListItemIcon>
            <Typography variant="inherit">Información personal</Typography>
          </MenuItem>
        </Link>
        <Link to={`/profile/profilePublications/${props.id}`}>
          <MenuItem>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <Typography variant="inherit">Mis publicaciones</Typography>
          </MenuItem>
        </Link>
        <Link to={`/profile/profileClients/${props.id}`}>
          <MenuItem>
            <ListItemIcon>
              <AccessibilityNew />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>Clientes</Typography>
          </MenuItem>
        </Link>
      </MenuList>
    </Paper>
  );
}

export default TypographyMenu;
