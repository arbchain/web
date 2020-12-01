/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@aragon/ui/dist/Card';
import active from '../../assets/active.svg';
import inactive from '../../assets/inactive.svg';
import totalcost from '../../assets/totalcost.svg';
import ChartComponent from './ChartComponent';
import agreement1 from '../../assets/agreement 1.svg';
import agreement2 from '../../assets/agreement 2.svg';
import notasksfound from '../../assets/notasksfound.svg';
import { AccountProvider, useAccount } from '../../wallet/Account';
// import TaskTable from './TaskTable'
// import { tasks } from '../../mock-data'
import { Header, Split, Box, DropDown } from '@aragon/ui';
import wallet from 'wallet-besu';

var green = '#219653';
var orange = '#FF7A3C';
var primary = '#52006F';

function Dashboard() {
  // TODO - only for testing we need to use the  connected account
  // const connectedAccount = useConnectedAccount()
  // const connectedAccount = '0x593e1F9809658d0c92e9f092cF01Aad7D0d734f3'

  const [isAuth, setIsAuth] = useState(true);

  const history = useHistory();
  const walletAccount = useAccount();
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
      {isAuth == true ? (
        <>
          <Header primary='Dashboard' />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr ',
              justifyItems: 'center',
              gridGap: '2rem',
              marginTop: '0rem',
              marginLeft: '1rem',
              marginRight: '1rem',
            }}
          >
            <div style={{ width: '100%' }}>
              <Box heading='Dispute stats'>
                <div>
                  <div style={{ display: 'flex' }}>
                    <Card
                      style={{ margin: '0.5rem', padding: '0rem' }}
                      width='8rem'
                      height='8rem'
                    >
                      <div>
                        <img src={active} />
                      </div>
                      <p>3</p>
                      <p style={{ color: green }}>Active</p>
                    </Card>
                    <Card
                      style={{ margin: '0.5rem', padding: '0rem' }}
                      width='8rem'
                      height='8rem'
                    >
                      <div>
                        <img src={inactive} />
                      </div>
                      <p>3</p>
                      <p style={{ color: orange }}>Inactive</p>
                    </Card>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card
                      style={{
                        margin: '1rem',
                        padding: '0rem',
                        backgroundColor: primary,
                      }}
                      width='8rem'
                      height='8rem'
                    >
                      <div>
                        <img src={totalcost} />
                      </div>
                      <p style={{ color: 'white' }}>$200K</p>
                      <p style={{ color: 'white' }}>Total cost</p>
                    </Card>
                  </div>
                </div>
              </Box>
            </div>
            <div style={{ width: '100%' }}>
              <Box heading='Activity'>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <DropDown items={['Monthly', 'Monthly', 'Monthly']} />
                </div>
                <div style={{ paddingBottom: '1.8rem' }}>
                  {/* <ChartComponent /> */}
                  <ChartComponent />
                </div>
              </Box>
            </div>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr ',
              justifyItems: 'center',
              gridRowGap: '1rem',
              gridColumnGap: '2rem',
              marginTop: '2rem',
              marginLeft: '1rem',
              marginRight: '1rem',
            }}
          >
            <div style={{ width: '100%', margin: '0rem', padding: '0rem' }}>
              <Box padding='0' heading='Documents Submitted'>
                <div style={{ marginTop: '1rem', display: 'flex' }}>
                  <Split
                    primary={
                      <div
                        style={{
                          display: 'flex',
                          margin: '0.5rem',
                          padding: '0.5rem',
                          justifyContent: 'center',
                        }}
                      >
                        <Card
                          style={{ margin: '0.5rem', padding: '0rem' }}
                          width='8rem'
                          height='8rem'
                        >
                          <div>
                            <img src={agreement1} />
                          </div>
                          <p>3</p>
                          <p style={{ color: '#219653' }}>Verified</p>
                        </Card>
                        <Card
                          style={{ margin: '0.5rem', padding: '0rem' }}
                          width='8rem'
                          height='8rem'
                        >
                          <div>
                            <img src={agreement2} />
                          </div>
                          <p>5</p>
                          <p style={{ color: '#FF7A3C' }}>Pending</p>
                        </Card>
                      </div>
                    }
                  />
                </div>
              </Box>
            </div>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <Box heading='Actions needed'>
                <div style={{ marginTop: '1rem' }}>
                  <div>
                    <img src={notasksfound} />
                  </div>
                  <div style={{ marginTop: '1rem' }}>
                    <p>No Tasks Found</p>
                  </div>
                </div>
              </Box>
            </div>
          </div>
        </>
      ) : (
        history.push('/login')
      )}
    </React.Fragment>
  );
}

export default Dashboard;
