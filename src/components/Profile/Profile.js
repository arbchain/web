import React from 'react'
import ProfileHeader from './ProfileHeader'

import { Header } from '@aragon/ui'

function Profile() {
  // TODO - only for testing we need to use the  connected account
  // const connectedAccount = useConnectedAccount()
  // const connectedAccount = '0x593e1F9809658d0c92e9f092cF01Aad7D0d734f3'

  return (
    <React.Fragment>
      <Header primary="Profile" />
      <ProfileHeader active />
    </React.Fragment>
  )
}

export default Profile
