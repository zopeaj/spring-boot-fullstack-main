import { userReducer } from "./user.slice";
import { userRegister, userLogin, userUpdate, adminLogin} from "./user.actions";

describe("user ", () => {
  const initialState = {
    token: '',
    isLoggedIn: false,
    logInError: false,
    isAdmin: false,
    isAuthenticated: false,
    isAuthorized: false,
    registrationError: '',
    status: '',
    userProfile: {
      usernameOrEmail: '',
      age: null,
      password: '',
      email: '',
      is_active: false,
      is_superuser: false,
      id: null,
      full_name: ''
    }
  };
  it('should handle initial state', () => {
    expect(userReducer(undefined, {type: 'unknown'})).toEqual({
      token: '',
      isLoggedIn: false,
      logInError: false,
      isAdmin: false,
      isAuthenticated: false,
      isAuthorized: false,
      registrationError: '',
      status: '',
      userProfile: {
        usernameOrEmail: '',
        age: null,
        password: '',
        email: '',
        is_active: false,
        is_superuser: false,
        id: null,
        full_name: ''
      }
    });
  });

  it('should handle user isloggedin', () => {
    const actual = userReducer(initialState, userLogin(true));
    expect(actual.isLoggedIn).toEqual(true);
  });

  it('should handle admin is ', () => {

  });
})
