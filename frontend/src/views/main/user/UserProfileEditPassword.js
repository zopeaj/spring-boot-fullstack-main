import { useState, Fragment } from "react";
import { Link, Switch, useNavigate, NavLink, useHistory} from "react-router-dom";
import { Grid, Button, Typography, IconButton, AppBar, CircularProgress, Snackbar, Toolbar, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useStyles } from "../../../styles/userStyles";
import { useDispatch } from "react-redux";
import { actionResetPassword, actionLogout } from "../../../data/user/user.actions";
import { readStatusText } from "../../../data/user/user.selector";


const UserProfileEditPassword = () => {
  const [ password, setPassword ] = useState();
  const [ confirmPassword, setConfirmPassword ] = useState();
  const [ loading, setLoading ] = useState();
  const [ passwordNotMatchError, setPasswordNotMatchError ] = useState();
  const [ passwordNotStrongError, setPasswordNotStrongError ] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const onConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  }

  const onClick = async (e) => {
    e.preventDefault();
    await dispatch(actionLogout());
  }

  const onUpdateProfilePassword = (e) => {
    e.preventDefault();
    setLoading(true);

    if(password !== confirmPassword) {
      setPasswordNotMatchError("Password does not match");
      setLoading(false);
    }

    if(!(/^[a-zA-Z]*&^%$#@!^*^$/.test(password)) && !password.length >= 10) {
      setPasswordNotStrongError("Password not strong enough");
      setLoading(false);
    }

    dispatch(actionResetPassword({ password: password }));
  }

  if(readStatusText !== "Unable to reset password") {
    setPassword(null);
    setConfirmPassword(null);
    return (
      <Snackbar message={readStatusText} success duration={4000} />
    );
  }else{
    return ( <Snackbar message={readStatusText} error duration={4000} /> );
  }

  return (
    <Fragment>
      <AppBar class="user-profile-edit-password">
        <Toolbar position="static">
          <div>
            <Typography variant="title">Logo</Typography>
          </div>
          <div class="right-side">
            <Button onClick={onClick}>Logout</Button>
          </div>
        </Toolbar>
      </AppBar>
      <div>
        <Grid container spacing={0}>
          <Grid item>
            <NavLink>
              <Button component={Link} to="/profile">Profile</Button>
              <Button component={Link} to="/settings">Settings</Button>
              <Button component={Link} to="/update">Update</Button>
            </NavLink>
          </Grid>
          <Grid item>
            <Typography variant="title" color="user-profile-header">
              User Profile Edit Password
            </Typography>
            <form onSubmit={onUpdateProfilePassword}>
              <label>Password: </label>
                <input type="password" value={password} onChange={onChangePassword} />
                <br />
              <label>Confirm Password: </label>
                <input type="password" value={confirmPassword} onChange={onConfirmPassword} />
                <span>{passwordError}</span>
               <button type="submit">Update Password</button>
               {loading ? <CircularProgress /> : null }
            </form>
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
}
