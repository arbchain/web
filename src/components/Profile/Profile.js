import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import wallet from 'wallet-besu';

import { Header } from '@aragon/ui';

function Profile() {
  const history = useHistory();

  const [isAuth, setIsAuth] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        // Fetching the password locally.
        const account = await wallet.login(localStorage.getItem('wpassword'));

        console.log('TESTTTT ACC', account);

        const OrianKey = await localStorage.getItem('orionKey');
        console.log('OIARKEY', OrianKey);

        if (
          account === null ||
          account === undefined ||
          OrianKey === null ||
          OrianKey === undefined
        ) {
          setIsAuth(false);
          history.push('/login');
        }
        console.log('ACCOUNT from Dashboard', account);
      } catch (err) {
        console.log(err);
      }
    }
    load();
  }, [isAuth]);
  console.log('ISAUTH', isAuth);

  return (
    <React.Fragment>
      <Header primary='Profile' />
      <ProfileHeader active />
    </React.Fragment>
  );
}

export default Profile;
