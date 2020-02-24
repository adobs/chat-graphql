import React, { useState, useContext, useEffect } from 'react';

const cachedUser = localStorage.getItem('user');
const initialData = { user: cachedUser, authed: false };

const AuthContext = React.createContext(initialData);

export const AuthProvider = props => {
  const { children } = props;

  const auth = useContext(AuthContext);

  const [data, setData] = useState(initialData);

  const checkAuth = () => {
    if (cachedUser) {
      setData({ user: cachedUser, authed: true });
      return true;
    } else {
      return false;
    }
  };

  const login = user => {
    console.log('logging in user', user);
    localStorage.setItem('user', user);
    setData({ user, authed: true });
  };

  const logout = () => {
    localStorage.clear();
    setData(initialData);
  };
  console.log('CACHED', cachedUser);
  // checkAuth();
  return (
    <AuthContext.Provider value={{ user: cachedUser, authed: data.authed, logout, login, auth }}>
      {children}
    </AuthContext.Provider>
  );
  // }
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  console.log(auth);
  return auth;
};
