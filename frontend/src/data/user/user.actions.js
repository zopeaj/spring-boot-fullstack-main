import {  setIsLoggedIn, setIsAuthorized, setIsAuthenticated, setIsAdmin, setUserData } from "./user.slice";
import { useHitory , useRoute} from "react-router-dom";
import { createAsyncThunk } from "@redux/toolkit";
import { useTokenStorage } from "../../hooks/useTokenStorage";
import {  getLocalToken } from "../../utils/utilsToken";

export const actionLogin = createAsyncThunk("user/login", async (data) => {
  const response = await api.logInGetToken(data.username, data.password);
  return response;
});

export const actionGetUserProfile = createAsyncThunk("user/getUserProfile", async () => {
  const response = await api.getMe(getLocalToken());
  return response;
})

export const actionUpdateUserProfile = createAsyncThunk("user/updateUserProfile", async (data) => {
  const response = await api.updateUserProfile(getLocalToken(), data);
  return response;
});

export const actionUserSettings = createAsyncThunk("user/settings", async (data) => {
  const response = await api.userSettings(getLocalToken(), data);
  return response;
})

export const actionUserRegistration = createAsyncThunk("user/registration", async (data) => {
  const response =  await api.register(data);
  return response;
});

export const actionLogout = createAsyncThunk("user/logout", async () => {
  const response = await api.logOutData(readUsername);
  return response;
})

export const actionCheckLoggedIn = createAsyncThunk("user/checkLoggedIn", async () => {
  const data = { };
  if(!readIsLoggedIn) {
    let token = readToken;
    if(!token) {
      const localToken = getLocalToken();
      if(localToken) {
        data["token"] = localToken;
        token = localToken;
      }
    }
    if(token) {
      const response = await api.getMe(token);
      data["loggedIn"] = true;
      data["userProfile"] = response.data
      data["status"] = response.status;
      data["error"] = response.error;
    }
  }
  return data;
})

export const actionAdminLogin = async (data) => {
  const response = await api.loginAdmin(data);
  return response;
}

export const actionAdminLogout = async () => {
  const response = await api.logoutAdmin(readIsAdmin, readUsername);
  return response;
}

export const actionPasswordRecovery = async (data) => {
  const response = (await Promise.all([
    await api.recoverPassword(data.username),
    await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
  ]))[0];
  return response;
}

export const actionResetPassword = async (data) => {
  const response = (await Promise.all([
    await api.resetPassword(data.password, readToken),
    await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
  ]))[0];
  return response;
}
