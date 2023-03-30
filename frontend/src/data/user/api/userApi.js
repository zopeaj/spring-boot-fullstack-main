import {  apiUrl } from "../../../env";

export const logInGetToken = (data) => {
  return fetch(apiUrl, {
    method: "GET",
    body: JSON.stringify(data),
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`
    }
  });
}

export const logOutData = (username) => {
  return fetch(apiUrl, {
    method: "GET",
    body: JSON.stringify(username),
    headers: {
      ContentType: "application/json"
    }
  });
}

export const register = (data) => {
  return fetch(apiUrl, {
    method: "POST",
    data,
    headers: {
      ContentType: "application/formdata",
    }
  });
}

export const getMe = (token) => {
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`
    }
  });
}

export const updateUserProfile = (data, token) => {
  return fetch(apiUrl, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`
    }
  });
}

export const userSettings = (data, token) => {
  return fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`
    }
  });
}

export const loginAdmin = (data) => {
  return fetch(apiUrl, {
    method: "GET",
    body: JSON.stringify(data),
    headers: {
      ContentType: "application/json",
    }
  });
}

export const logoutAdmin = (isAdmin, username) => {
  return fetch(apiUrl, {
    method: "GET",
    body: JSON.stringify(isAdmin, username),
    headers: {
      ContentType: "application/json",
    }
  });
}

export const recoverPassword = (username) => {
  return fetch(apiUrl, {
    method: 'GET',
    body: JSON.stringify(username),
    headers: {
      ContentType: "application/json",
    }
  });
}

export const resetPassword = (password, token) => {
  return fetch(apiUrl, {
    method: "GET",
    body: JSON.stringify(password),
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`
    }
  });
}
