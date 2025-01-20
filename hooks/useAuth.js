// hooks/useAuth.js
import { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  return user;
};

export default useAuth;
