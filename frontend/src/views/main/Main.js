import { useState, useEffect, Fragment } from "react";
import { Grid, Toolbar, AppBar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useStyles } from "../../styles/mainStyles";

export const Main = () => {
  return (
     <Fragment>
       <AppBar>
         <Toolbar class="main-toolbar">
           <Typography title="title">
             User Authentication and Authorization
           </Typography>
           <div class="right-button">
             <Button component={Link} to="/login">Login</Button>
             <Button component={Link} to="/register">Register</Button>
           </div>
         </Toolbar>
       </AppBar>
     </Fragment>
  );
}
