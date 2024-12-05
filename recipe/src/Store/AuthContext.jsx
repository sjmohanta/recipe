import { createContext, useReducer } from "react";
import { getAuthInfo, saveAuthToken, clearAuthToken } from "../Utility/AuthUtility";

export const AuthContext = createContext({
    auth: undefined,
    saveAuth: () => {},
    clearAuth: () => {}
});

function authReducer(state, action) {
    if (action.type === 'LOGIN') {
        saveAuthToken(action.payLoad)
        return { auth: getAuthInfo() };
    }
    else if (action.type === 'LOGOUT') {
        clearAuthToken();
        return { auth: undefined };
    }

    return state;
}

export default function AuthContextProvider({children})
{
    const authInfo = getAuthInfo();

    const [authState, authDispatch] = useReducer(
        authReducer,
        {
          auth: authInfo,
        }
      );

      function saveAuthState(payLoad)
      {
        authDispatch({type: 'LOGIN', payLoad: payLoad});
      }

      function clearAuthState()
      {
        authDispatch({type: 'LOGOUT'});
      }

    const ctxValues = {
        auth: authState.auth,
        saveAuth: saveAuthState,
        clearAuth: clearAuthState
      };

    return <AuthContext.Provider value={ctxValues}>
        {children}
    </AuthContext.Provider>;
}