/* eslint-disable */

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Main } from '@aragon/ui';

import theme from './theme-court';

import MainView from './components/MainView';
import ErrorPage from './ErrorPage';

import LoginPage from './components/Login/LoginPage';
import SignUp from './components/Login/SignUp';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import Arbitrations from './components/Arbitrations/Arbitrations';
import Agreements from './components/Arbitrations/Agreements';
import ProcedureDetails from './components/Arbitrations/ProcedureDetails';
import ArbitrationDetail from './components/Arbitrations/ArbitrationDetail';
import AgreementDetails from './components/Arbitrations/AgreementDetails';
import { ActivityProvider } from './components/Activity/ActivityProvider';
import { AccountProvider } from './wallet/Account.js';
import Database from "./components/Database";

function App() {
  return (
    <AccountProvider>
      <BrowserRouter>
        <ActivityProvider>
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/signup' component={SignUp} />
          <Main layout={false} theme={theme}>
            <MainView>
              <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route exact path='/dashboard' component={Dashboard} />
                <Route exact path='/db' component={Database}/>
                <Route exact path='/arbitrations' component={Arbitrations} />
                <Route exact path='/agreements' component={Agreements} />
                <Route path='/profile' component={Profile} />
                <Route
                  path='/arbitrations/:address/:groupId'
                  component={ArbitrationDetail}
                />
                <Route
                  path='/agreements/:address/:groupId'
                  component={AgreementDetails}
                />
                <Route path='/proceduredetails' component={ProcedureDetails} />
                <Route component={ErrorPage} />
              </Switch>
            </MainView>
          </Main>
        </ActivityProvider>
      </BrowserRouter>
    </AccountProvider>
  );
}

export default App;
