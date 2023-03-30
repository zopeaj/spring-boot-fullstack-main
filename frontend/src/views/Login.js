import React, { Fragment, useState, useEffect } from "react";
import { ContentHeader, ContentTitle, Toolbar, CircularProgress, Typography, IconButton, TextInput, Grid, Button} from "@mui/material";
import  MenuButton  from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { useStyles } from "../styles/mainStyles";
import { actionLogin } from "../data/user/user.actions";
import { readLogInError } from "../data/user/user.selector";


export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const onLogin = (e) => {
      e.preventDefault();
      setLoading(true);
      dispatch(actionLogin({password: password, username: username}));
    }

    if(readLogInError !== null) {
      setLoading(false);
      setEmail(null);
      setPassword(nulll);
      setError(readLogInError);
    }

    return (
      <Fragment>
        <div class="">
          <AppBar>
            <Toolbar>
              <IconButton>
                <MenuButton />
              </IconButton>
              <Typography variant="title">Login</Typography>
            </Toolbar>
          </AppBar>
          <Grid container>
            <form onSubmit={onLogin}>
             <Grid container alignItems="center" spacing={4}>
               <Grid item>
                  <label>Username: </label>
                  <TextInput type="text" placeholder="username" />
               </Grid>
               <Grid item>
                  <label>Password: </label>
                  <TextInput type="password" placeholder="password" />
               </Grid>
               <Grid item>
                 <Row>
                   <Col>
                     <button type="submit">Login</button>
                   </Col>
                   <Col>
                     <Button component={Link} to="/register">Register</Button>
                     {loading ? <CircularProgress /> : null}
                   </Col>
                 </Row>
               </Grid>
               <Grid item>
                 <Typography variant="title">{ error ? error : null}</Typography>
               </Grid>
             </Grid>
            </form>
          </Grid>
        </div>
      </Fragment>
    );
}
