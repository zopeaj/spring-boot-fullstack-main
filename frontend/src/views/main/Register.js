import { useState, useEffect, Fragment } from "react";
import { Grid, TextInput, Toolbar, Row, Col, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useStyles } from "../../styles/mainStyles";

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [errorCallback, setErrorCallback] = useState('');
  const [successCallback, setSuccessCallback] = useState('');

  const onRegister = () => {
    return null;
  }

  return (
    <Fragment>
      <Toolbar position="static">
        <div className="">
          <Toolbar position="static">
            <div class="">
              Register
            </div>
          </Toolbar>
          <Grid container>
            <Grid item>
              <form onSubmit={onRegister}>
                <Grid container>
                  <Grid item>
                    <label>Username: </label>
                    <TextInput type="text" placeholder="username" />
                  </Grid>
                  <Grid item>
                    <label>Password: </label>
                    <TextInput type="password" placeholder="password" />
                  </Grid>
                  <Grid item>
                    <label>Email: </label>
                    <TextInput type="email" placeholder="email" />
                  </Grid>
                  <Grid item>
                    <label>Age: </label>
                    <TextInput type="number" placeholder="age" />
                  </Grid>
                  <Grid item>
                    <Row>
                      <Col>
                        <Button color="primary" type="submit" variant="contained">Register</Button>
                      </Col>
                      <Col>
                        <Button color="secondary" component={Link}>Login</Button>
                      </Col>
                    </Row>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </div>
      </Toolbar>
    </Fragment>
  );
}
