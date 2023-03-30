import { useSelector } from "react-redux";

const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const readIsLoggedIn = useSelector(selectIsLoggedIn);

const selectStatusText = (state) => state.user.statusText;
export const readStatusText = useSelector(selectStatusText);

const selectIsAdmin = (state) => state.user.isAdmin;
export const readIsAdmin = useSelector(selectIsAdmin);

const selectIsAuthorized = (state) => state.user.isAuthorized;
export const readIsAuthorized = useSelector(selectIsAuthorized);

const selectUsername = (state) => state.user.userProfile.usernameOrEmail;
export const readUsername = useSelector(selectUsername);

const selectAge = (state) => state.user.userProfile.age;
export const readAge = useSelector(selectAge);

const selectEmail = (state) => state.user.userProfile.email;
export const readEmail = useSelector(selectEmail);

const selectIsActive = (state) => state.user.userProfile.is_active
export const readIsActive = useSelector(selectIsActive);

const selectUserId = (state) => state.user.userProfile.id;
export const readId = useSelector(selectUserId);

const selectUserFullname = (state) => state.user.userProfile.fullName;
export const readUserFullname = useSelector(selectUserFullname);

const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const readIsAuthenticated = useSelector(selectIsAuthenticated);

// const selectFirstNotification = (state) => state.notifications.length > 0 && state.notifications[0];
// export const readFirstNotification = useSelector(selectFirstNotification);

const selectLogInError = (state) => state.user.logInError;
export const readLogInError = useSelector(selectLogInError);

const selectRegistrationError = (state) => state.user.registrationError;
export const readRegistrationError = useSelector(selectRegistrationError);

const selectStatus = (state) => state.user.status;
export const readStatus = useSelector(selectStatus);

const selectApiError = (state) => state.user.apiError;
export const readApiError = useSelector(selectApiError);

const selectPasswordRecovery = (state) => state.user.passwordRecovery;
export const readPasswordRecovery = useSelector(selectPasswordRecovery);



