User implements UserDetails

id
name
email
password
role
age

model
 User.java
controller
 UserController.java
 AdminController.java
service
 UserService.java
 IUserService.java
repository
 UserRepository.java
 UserDao.java
 UserDto.java
 IUserRepository.java
jwt
  authentication
    JwtUsernameAndPasswordAuthenticationFilter.java
  authorization
    JwtFilterChain.java
  config
    JwtConfig.java
  util
    JwtUtil.java
config
  database
    DatabaseConfiguration.java
  security
    SecurityConfig.java
    PasswordConfig.java
    ApplicationUserPermission.java
    ApplicationUserRole.java
exceptions:
  AuthenticationException.java
  UsernameNotFoundException.java




try {
    const response = await api.logInGetToken(data.username, data.password);
    const token = response.data.token;
    if(token){
      saveLocalToken(token);
      dispatch(commitSetToken(token));
      dispatch(commitSetLoggedIn(true));
      dispatch(commitSetLogInError(false));
      await actionGetUserProfile();
      await actionRouteLoggedIn();
      dispatch(commitAddNotification({content: "Logged In", color: 'success'}));
    } else {
      await actionLogOut();
    }
  }catch(error) {
    dispatch(commitSetLogInError(error));
    await actionLogOut();
  }




export const actionGetUserProfile = createAsyncThunk("user/getUserProfile", async () => {
  const dispatch = useDispatch();
  try {
    const response = await api.getMe(getLocalToken());
    if(response.data){
      dispatch(commitSetUserProfile(response.data));
    }
  }catch(error){
    await dispatch(commitSetApiError(error));
  }
});


export const actionGetUserProfile = createAsyncThunk("user/getUserProfile", async () => {
  const dispatch = useDispatch();
  try {
    const response = await api.getMe(getLocalToken());
    if(response.data){
      dispatch(commitSetUserProfile(response.data));
    }
  }catch(error){
    await dispatch(commitSetApiError(error));
  }
});

export const actionUpdateProfile = createAsyncThunk("user/updateProfile", async () => {
    try {
    const loadingNotification = { content: 'saving', showProgress: true };
    dispatch(commitAddNotification(loadingNotification));
    const response = await api.actionUpdateUserProfile(getLocalToken(), data);
    if(response.data !== null) {
      dispatch(commitSetUserProfile(response.data));
      dispatch(commitRemoveNotification(loadingNotification));
      dispatch(commitAddNotification({ content: 'Profile successfully updated', color: 'success' }));
    }
  }catch (error) {
      await dispatchCheckApiError();
  }
})


export const actionRegistration = createAsyncThunk("user/registration", async (data) => {
  const response = await api.register(data);
  return response;
});


export const actionCheckLoggedIn = createAsyncThunk("user/checkLoggedIn", async () => {
  const dispatch = useDispatch();
  if(!readIsLoggedIn) {
    let token = readToken;
    if(!token) {
      const localToken = getLocalToken();
      if(localToken) {
        dispatch(commitSetToken(localToken));
        token = localToken
      }
    }
    if(token) {
      try {
        const response = await api.getMe(token);
        dispatch(commitSetLoggedIn(true));
        dispatch(commitSetUserProfile(response.data));
      } catch {
        await actionRemoveLogin(context);
      }
    } else {
        await actionRemoveLogin(context);
    }
  }
});




const actionRouteLoggedIn = createAsyncThunk("user/routeLoggedIn", async () => {
  const router = useHitory();
  if(router.currentRoute.path === "/login" || router.currentRoute.path === "/") {
    router.push("/main");
  }
});


const actionRemoveLogin = createAsyncThunk("user/removeLogin", async () => {
  const dispatch = useDispatch();
  removeLocalToken();
  dispatch(commitSetToken(''));
  dispatch(commitSetLoggedIn(false));
});

const actionUserLogOut = async () => {
  await actionLogOut();
  dispatch(commitAddNotification({content: 'Logged out', color: 'success'}));
}

const actionLogOut = createAsyncThunk("user/routeLoggedOut", async () => {
  actionRemoveLogin()
  actionRouteLogOut();
});

const actionRouteLogOut = () => {
  const router = useRoute();
  if(router.currentRoute.path !== '/login') {
    router.push("/login");
  }
}

const actionCheckApiError = async (payload) => {
  if (payload.response.status === 401) {
      await dispatchLogOut(context);
  }
}

const removeNotification = (payload) => {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          commitRemoveNotification(context, payload.notification);
          resolve(true);
      }, payload.timeout);
  });
}


export const actionPasswordRecovery = async (payload) => {
  const loadingNotification = { content: 'Sending password recovery email', showProgress: true };
  try {
      commitAddNotification(context, loadingNotification);
      const response = (await Promise.all([
          api.passwordRecovery(payload.username),
          await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
      ]))[0];
      commitRemoveNotification(context, loadingNotification);
      commitAddNotification(context, { content: 'Password recovery email sent', color: 'success' });
      await dispatchLogOut(context);
  } catch (error) {
      commitRemoveNotification(context, loadingNotification);
      commitAddNotification(context, { color: 'error', content: 'Incorrect username' });
  }
}


export const actionResetPassword = async (payload) => {
  const loadingNotification = { content: 'Resetting password', showProgress: true };
  try {
      commitAddNotification(context, loadingNotification);
      const response = (await Promise.all([
          api.resetPassword(payload.password, payload.token),
          await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
      ]))[0];
      commitRemoveNotification(context, loadingNotification);
      commitAddNotification(context, { content: 'Password successfully reset', color: 'success' });
      await dispatchLogOut(context);
  } catch (error) {
      commitRemoveNotification(context, loadingNotification);
      commitAddNotification(context, { color: 'error', content: 'Error resetting password' });
  }
}


// state.notifications.push({content: 'Successfully retrieved user', color: 'success', showProgress: false});
// state.notifications.push({content: "Logged In ", color: "success"});
