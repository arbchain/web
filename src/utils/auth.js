import { AsyncMode } from '@aragon/ui/dist/index-46d0e707';
import { async } from '@aragon/ui/dist/ToastHub';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import wallet from 'wallet-besu';

const useAuthentication = () => {
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

export default useAuthentication;
