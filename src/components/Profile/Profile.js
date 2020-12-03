import React from 'react';
import ProfileHeader from './ProfileHeader';
import useAuthendication from '../../utils/auth';

import { Header } from '@aragon/ui';

function Profile() {
  useAuthendication();

  return (
    <React.Fragment>
      <Header primary='Profile' />
      <ProfileHeader active />
    </React.Fragment>
  );
}

export default Profile;
