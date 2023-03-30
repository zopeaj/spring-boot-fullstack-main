import { createSlice } from "@redux/toolkit";
import { initialState } from "./user.state";
import { userRegistrationService } from "./services/userService";
import { actionUserRegistration, actionLogin, actionGetUserProfile, actionUpdateUserProfile, actionCheckLoggedIn, actionLogout, actionPasswordRecovery, actionResetPassword, actionAdminLogin, actionAdminLogout } from "./user.actions";
import { removeLocalToken, saveLocalToken  } from "../../utils/utilsToken";

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(actionUserRegistration.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(actionUserRegistration.fulfilled, (state, action) => {
        const { statusText, status, token } = action.payload;
        state.status = 'idle';
        if(status > 300) {
           state.registrationError = "Error while trying to register user";
           state.statusText = null;
        }
        saveLocalToken(token);
        state.token = token;
        state.statusText = statusText;
        state.registrationError = null;
      });

    builder
      .addCase(actionLogin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(actionLogin.fulfilled, (state, action) => {
        const { statusText, status,  token} = action.payload;
        state.status = 'idle';
        if(status > 300) {
          state.logInError = "Error while trying to log in user";
          state.statusText = null;
        }
        saveLocalToken(token);
        state.token = token;
        state.isLoggedIn = status == 201 ? true : false;
        state.logInError = false;
        state.isAuthenticated = true;
        state.isAuthorized = true;
        state.registrationError = null;
      })

    builder
      .addCase(actionGetUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(actionGetUserProfile.fulfilled, (state, action) => {
        const { statusText, status, data } = action.payload;
        if(status > 300) {
          state.logInError = "Error while trying to log in user";
          state.statusText = null;
        }
        state.userProfile = { ...data, isActive: true, isAdmin: false };
        state.status = 'idle';
      })
      .addCase(actionGetUserProfile.rejected, (state) => {
        state.status = 'failed';
      });

    builder
      .addCase(actionUpdateUserProfile.pending, (state) => {
          state.status = 'idle';
      })
      .addCase(actionUpdateUserProfile.fulfilled, (state, action) => {
        state.status = 'loading';
        const { statusText, status, data, token } = action.payload;
        if(status >= 400) {
          state.apiError = "Something went wrong while trying to update user";
          state.statusText = null;
        }
        saveLocalToken(token);
        state.userProfile = { ...data, token: token };
      });

    builder
      .addCase(actionCheckLoggedIn.pending, (state) => {
        state.status = 'idle';
      })
      .addCase(actionCheckLoggedIn.fulfilled, (state, action) => {
          state.status = 'loading';
          const { status, data } = action.payload;
          if(status >= 400){
            state.logInError = "Error trying to log in";
          }
          state.logInError = null;
          state.status = 'idle';
      });

    builder
      .addCase(actionRemoveLogin.pending, (state) => {
        state.status = 'idle';
      })
      .addCase(actionRemoveLogin.fulfilled, (state, action) => {
        state.status = 'loading';
        const { status, data } = action.payload;
        if(state >= 400) {
          state.apiError = "Error trying to logout user";
        }

        removeLocalToken();
        state = { userProfile: data,  token:null, isLoggedIn: false,
         logInError: false, isAdmin: false,
         isAuthenticated: false, isAuthorized: false,
         registrationError: null, apiError: null};
      });

    builder
      .addCase(actionPasswordRecovery.pending, (state) => {
          state.status = 'idle';
      })
      .addCase(actionPasswordRecovery.fulfilled, (state, action) => {
        state.status = 'loading';
        const { statusText, status, data } = action.payload;
        if(status === 200) {
          state.passwordRecovery = data.username;
          state.statusText = "Successfully recovered password";
        }
        state.passwordRecovery = null;
        state.statusText = "Username not found";
        state.status = 'idle';
      });

    builder
      .addCase(actionResetPassword.pending, (state) => {
        state.status = 'idle';
      })
      .addCase(actionResetPassword.fulfilled, (state, action) => {
        state.status = "loading";
        const { statusText, status, data } = action.payload;
        if(status >= 400) {
          state.statusText = "Unable to reset password"
        }
        state.statusText = statusText;
        state.loading = "idle";
      });

    builder
      .addCase(actionAdminLogin.pending, (state) => {
        state.status = 'idle';
      })
      .addCase(actionAdminLogin.fulfilled, (state, action) => {
        state.status = "loading";
        const { statusText, status, data } = action.payload;
        if(status >= 400) {
          state.statusText = "Error trying to log in admin";
          state.logInError = true;
        }
        state.isAdmin = true;
        state.logInError = false;
        state.isAuthenticated = true;
        state.isAuthorized = true;
        state.statusText = statusText;
        state.loading = "idle";
        state.userProfile = { ...data };
      });

    builder
      .addCase(actionAdminLogout.pending, (state) => {
        state.status = "idle";
      })
      .addCase(actionAdminLogout.fulfilled, (state) => {
        state.status = "loading";
        const { statusText, status, data } = action.payload;
        if(status >= 400) {
          state.statusText = statusText;
          state.apiError = "Error while trying to logout";
        }
        state = { isAdmin: false, logInError: false, isAuthenticated: false, isAuthorized: false };
        state.loading = "idle";
        state.userProfile =  { ...data };
      });
  },
});

export const { userReducer } = userSlice.reducer;
export const {  } = userSlice.actions;


