/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { createContext, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children, value }) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthValue() {
  return useContext(AuthContext);
}
