/* eslint-disable */
import React, { useState, useEffect } from 'react';
import {
  addressesEqual,
  Box,
  GU,
  IconEdit,
  TextInput,
  AddressField,
  useTheme,
  Button,
  TextCopy,
} from '@aragon/ui';
import { Skeleton } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import wallet from 'wallet-besu';
import { authorizeUser, getLoginUser } from '../../lib/db/threadDB';
import { useAccount } from '../../wallet/Account.js';
import Avatar from '../../assets/avatar.png';
import styled from 'styled-components';

const antIcon = (
  <LoadingOutlined style={{ fontSize: 50, color: '#4d4cbb' }} spin />
);

const Web3 = require('web3');
const web3 = new Web3();

const accounts = require('../../wallet/keys');
const networks = require('../../wallet/network');

const NODES = Object.keys(networks).map((node) => {
  return `${networks[node].host}:${networks[node].port}`;
});

const ProfileContainer = styled(Box)`
  overflow: hidden;
  border-radius: 0;
  margin-bottom: ${2 * GU}px;
  .avatar__group {
    display: flex;
    flex-direction: row;
  }
  @media (min-width: 481px) and (max-width: 767px) {
    .flex {
      width: 350px;
      overflow: hidden;
    }
  }
  @media (min-width: 320px) and (max-width: 480px) {
    .flex {
      width: 350px;
      overflow: hidden;
    }
  }
`;

const GridContainer = styled.div`
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 14px;
  .inputGroups {
    margin-left: 0.5rem;
    margin-bottom: 22px;
    justify-content: center;

    .input {
      width: 300px;
      overflow: hidden;
    }
  }

  @media (min-width: 481px) and (max-width: 767px) {
    display: flex !important;
    flex-direction: column;
    overflow: hidden;
  }

  @media (min-width: 320px) and (max-width: 480px) {
    display: flex !important;
    flex-direction: column;
    overflow: hidden;
  }
`;

const Profile = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
  .avatar {
    width: 60px;
    height: auto;
  }
  .address-group {
    padding-left: 10px;
  }
  .btn-primary {
    color: #fff;
    background: #4d4cbb;
  }

  @media (min-width: 481px) and (max-width: 767px) {
    display: flex !important;
    flex-direction: column;
    overflow: hidden;
    .btn-primary {
      color: #fff;
      background: #4d4cbb;
      margin-top: 14px;
    }
  }

  @media (min-width: 320px) and (max-width: 480px) {
    display: flex !important;
    flex-direction: column;
    overflow: hidden;
    .btn-primary {
      color: #fff;
      background: #4d4cbb;
      margin-top: 14px;
      overflow: hidden;
    }
  }
`;

export default function ProfileHeader({ active }) {
  const [selected, setSelected] = useState(0);
  const [userData, setUserData] = useState(null);
  const [address, setAddress] = useState(null);
  const userRole = { 0: 'Party', 1: 'Arbitrator', 2: 'Arbitral Court' };

  const walletAccount = useAccount();
  const theme = useTheme();

  useEffect(() => {
    async function load() {
      try {
        // Fetching the password locally. Need a secure way to do this for prod
        const account = await wallet.login(localStorage.getItem('wpassword'));
        const dbClient = await authorizeUser(localStorage.getItem('wpassword'));
        if (dbClient !== null) {
          let userInfo = await getLoginUser(account[0], dbClient);
          if (userInfo !== null) {
            console.log('User Data:', userInfo);
            setAddress(userInfo.address);
            setUserData(userInfo);
          }
        } else {
          console.log('Some error!!!');
        }
      } catch (err) {
        return false;
      }
    }
    load();
  }, []);

  let card;
  if (userData != null) {
    const { name, number, zipCode, role } = userData;

    card = (
      <>
        <div className='inputGroups '>
          <h3>Name</h3>
          <TextInput className='input' readOnly value={name} />
        </div>

        <div className='inputGroups '>
          <h3>Contact</h3>
          <TextInput className='input' readOnly value={number} />
        </div>

        <div className='inputGroups '>
          <h3>Email</h3>
          <TextInput className='input' readOnly value='JohnDoe@domain.com' />
        </div>

        <div className='inputGroups '>
          <h3>Role</h3>
          <TextInput className='input' readOnly value={userRole[role]} />
        </div>
        <div className='inputGroups'>
          <h3>Zip Code</h3>
          <TextInput className='input' readOnly value={zipCode} />
        </div>
      </>
    );
  }

  return (
    <>
      <ProfileContainer padding={40}>
        <Profile className='flex'>
          <div className='avatar__group'>
            <img className='avatar' src={Avatar} alt='' srcset='' />
            <div className='address-group'>
              <h3>Address</h3>
              <TextCopy value={address} readOnly />
            </div>
          </div>
          <Button
            className='btn-primary'
            icon={<IconEdit style={{ color: '#fff' }} />}
            label='EDIT PROFILE'
          />
        </Profile>

        <GridContainer>
          {userData != null ? (
            <>{card}</>
          ) : (
            <GridContainer>
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
            </GridContainer>
          )}
        </GridContainer>
      </ProfileContainer>
    </>
  );
}
