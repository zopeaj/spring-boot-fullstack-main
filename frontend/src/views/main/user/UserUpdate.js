import { useState, useEffect, Fragment } from "react";
import { Typography, TextField, Grid, Button, Dialog, CircularProgress, DialogActions, DialogContent, DialoContentText, DialogTitle } from "@mui/material";
import { useStyles } from "../../../styles/userStyles";
import { actionUpdateUserProfile } from "../../../data/user/user.actions";
import { readApiError } from "../../../data/user/user.selector";

export const UserUpdate = () => {
  const [fullName, setFullName] = useState();
  const [usernameOrEmail, setUsernameOrEmail ] = useState();
  const [age, setAge] = useState();
  const [updateError, setUpdateError] = useState(false);
  const [nullableError, setNullableError] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSetName = (e) => {
    setFullName(e.target.value);
  }

  const onUsernameChange = (e) => {
    setUsernameOrEmail(e.target.value);
  }

  const onAgeChange = (e) => {
    setAge(e.target.value);
  }

  const onUpdateUserData = async (e) => {
    e.preventDefault();

    if(fullName !== null && usernameOrEmail !== null && age !== null) {
       setNullableErrorError(false);
    }

    setLoading(true);
    await dispatch(actionUpdateUserProfile({fullName: fullName, usernameOrEmail: usernameOrEmail, age: age}));
  }

  if(readApiError != "Something went wrong while trying to update user") {
    return (
      <Snackbar message={readApiError} success duration={4000} />
    )
  }else {
    return (
      <Snackbar message={readApiError} error duration={4000} />
    )
  }

  return (
     <Fragment>
       <AppBar>
         <Toolbar class="user-update">
           <div>
             <Typography variant="title">User Update </Typography>
           </div>
         </Toolbar>
       </AppBar>
       <div>
         <Grid container>
           <Grid item>
             <form onSubmit={onUpdateUserData}>
               <Grid container>
                 <Grid item>
                    <label>Name: </label>
                    <input type="text" value={fullName} onChange={onSetName} />
                 </Grid>
                 <Grid item>
                    <label>Name: </label>
                    <input type="email" value={usernameOrEmail} onChange={onUsernameChange} />
                 </Grid>
                 <Grid item>
                    <label>Name: </label>
                    <input type="number" value={age} onChange={onAgeChange} />
                    <span className={nullableError ? 'error' : null}>{ nullableError ? "User age is required"  : null}</span>
                 </Grid>
               </Grid>
               <Grid item>
                 <Row>
                   <Col>
                     <button type="submit">Update Profile</button>
                   </Col>
                 </Row>
               </Grid>
             </form>
           </Grid>
         </Grid>
       </div>
     </Fragment>
  );
}

