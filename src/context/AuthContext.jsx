import { createContext, useContext, useState, useEffect } from 'react';
import { getUserLoginData } from '../utils/storage'; 
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    // On app load, try to fetch user from storage
    const user = getUserLoginData();
    if (user) {
      setIsLogged(true);
      setLoggedUser(user);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, loggedUser, setLoggedUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);