import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import wallet from 'wallet-besu';

const useAuthendication = () => {
  const [isAuth, setIsAuth] = useState(true);

  const history = useHistory();

  useEffect(() => {
    async function load() {
      try {
        // Fetching the password locally.
        const account = await wallet.login(localStorage.getItem('wpassword'));
        const OrianKey = await localStorage.getItem('orionKey');
        if (
          account === null ||
          account === undefined ||
          OrianKey === null ||
          OrianKey === undefined
        ) {
          setIsAuth(false);
          history.push('/login');
        }
      } catch (err) {
        console.log(err);
      }
    }
    load();
  }, [isAuth]);

  return isAuth;
};

export default useAuthendication;
