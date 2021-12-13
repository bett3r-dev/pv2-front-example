import { useState, useEffect, useContext, createContext } from 'react';
import { auth } from '../../services/firebase';

const authContext = createContext();

export function ProvideAuth({ children }) {
  const _auth = useProvideAuth();
  return <authContext.Provider value={_auth}>{children}</authContext.Provider>;
}

export default function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState({
    isLoading: true,
    user: null,
  });

  const signin = (email, password) => {
    return auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        return (response.user);
      });
  };

  const signup = (email, password) => {
    const baseUrl = process.env.REACT_APP_PV2_SERVER_DOMAIN;
    return fetch(`${baseUrl}/api/register`,
      {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({email, password})
      }).then(res => res.json())
  }

  const signout = () => {
    setUser({
      isLoading: true,
    });
    return auth()
      .signOut()
      .then(() => {
        sessionStorage.clear();
        setUser({
          isLoading: false,
          user: null,
        });
        return null;
      })
      .catch(err => {
        setUser({
          ...user,
          isLoading: false,
        });
        return err;
      });
  };

  const sendPasswordResetEmail = email => {
    return auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      });
  };

  const confirmPasswordReset = (code, password) => {
    return auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      });
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        setUser({
          isLoading: false,
          user,
        })
      } else {
        setUser({
          isLoading: false,
          user: null,
        });
      }
    });
    return () => unsubscribe();
  }, []);

  return {
    ...user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}
