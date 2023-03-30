import React, { Fragment } from 'react';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Main, Dashboard, Register } from "./views/main";
import { Login } from "./views/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" />
          <Route path="/user" element={<UserProfile />}>
            <Route path="/settings" element={<UserSettings />} />
            <Route path="/update" element={<UserUpdate />} />
            <Route path="/profileEditPassword" element={<UserProfileEditPassword />} />
          </Route
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/passwordRecover" element={<PasswordRecovery />} />
          <Route path="/resetPassword" element={<RestPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
