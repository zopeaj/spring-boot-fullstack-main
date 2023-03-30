import { useState, useEffect, Fragment } from "react";
import { IconButton, Toolbar, AppBar, Button, Grow, Typography } from "@mui/material";
import {readUsername, readUserIsAuthenticated } from "../../../data/user/user.selector";
import MenuIcon from "@mui/icons-material";
import { Redirect, Route, Link, Switch } from "react-router-dom";
import { UserUpdate, UserSettings } from "../user";
import { useStyles } from "../../../styles/userStyles";

const UserProfile = () => {
  const classes = useStyles();

  return (
     <Fragment>
       <Switch>
         <Route exact path="/update" component={UserUpdate} />
         <Route exact path="/settings" component={UserSettings} />
       </Switch>
       <AppBar position="static">
         <Toolbar className={classes}>
           <IconButton className={classes} color="inherit" aria-label="Menu">
             <MenuIcon />
           </IconButton>
           <Typography variant="title" color={classes.color} className={classes}>
             User Profile
           </Typography>
         </Toolbar>
       </AppBar>
       <Grid container alignItems="" spacing={4}>
         <Grid item>
           <Toolbar>
             <Button component={Link} to="/update">Update</Button>
             <Button component={Link} to="/settings">Settings</Button>
             <Button component={Link} to="/logout">Logout</Button>
           </Toolbar>
         </Grid>
         <Grid item>
            <Typography variant="h5" color={classes}>
              Welcome {readUserIsAuthenticated ? readUsername : <Redirect to="/login" />} !
            </Typography>
         </Grid>
       </Grid>
     </Fragment>
  );
}
