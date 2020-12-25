import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { ROUTEPATH } from './common/appConstants';
import Login from './views/login/login';
import Signup from './views/signup/signup';
import Dashboard from './views/dashboard/dashboard';
import { Provider } from 'react-redux'
import  Store from '../src/state/store'


function App(props) {
  return (
    <div>
      <Provider store={Store}>
        <BrowserRouter>
          <Switch>
              <Route exact path={ROUTEPATH.INDEX} component={Login} />
              <Route exact path={ROUTEPATH.SIGNUP} component={Signup} />
              <Route exact path={ROUTEPATH.DASHBOARD} component={Dashboard} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
