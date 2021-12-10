import { Switch, Redirect, Route, useLocation } from 'react-router-dom';
// import useAuth from './hooks/useAuth/index.js';
import Layout from './screens/Layout.jsx';
import Demo from './screens/demo/Demo.jsx';
import Inputs from './screens/demo/Inputs.jsx';
import Buttons from './screens/demo/Buttons.jsx';
import Info from './screens/demo/Info.jsx';
import Sanity from './screens/demo/Sanity.jsx';
import Spinner from './components/common/Spinner.jsx';
import AuthMain from './screens/auth/AuthMain.jsx';
import Home from './screens/Home.jsx';

//How to change variable colors from outside
// const root = document.documentElement;
// root.style.setProperty('--color-primary', '#FFCB05');

const App = ({ props }) => {
  const location = useLocation();
  // const { user, isLoading } = useAuth();
  return (
    <Switch>
      {/* {!user && !['/auth', '/auth/login', '/auth/register', '/auth/passwordRecover', '/auth/forgotPassword'].includes(location.pathname) && <Redirect to={'/auth'}></Redirect>} */}
      {/* {user && ['/auth', '/auth/login', '/auth/register', '/auth/passwordRecover', '/auth/forgotPassword'].includes(location.pathname) && <Redirect to={'/demo'}></Redirect>} */}
      {/* {isLoading && <Spinner />} */}
      <Route exact path={[ '/auth', '/auth/login', '/auth/register', '/auth/passwordRecover', '/auth/forgotPassword' ]}
        render={(routeProps) => <AuthMain {...routeProps} />}></Route>
      <Route render={(routeProps) => [ '/auth', '/auth/login', '/auth/register', '/auth/passwordRecover', '/auth/forgotPassword' ].includes(routeProps.location.pathname) ? null : (
            <Layout>
              <Route exact path='/demo'>
                  <Demo />
              </Route>
              <Route exact path='/demo/inputs'>
                  <Inputs />
              </Route>
              <Route exact path='/demo/buttons'>
                  <Buttons />
              </Route>
              <Route exact path='/demo/info'>
                  <Info />
              </Route>
              <Route exact path='/demo/sanity'>
                  <Sanity src={'https://safetyapp.sanity.studio/desk'} />
              </Route>
              <Route exact path='/'>
                  <Home/>
              </Route>
            </Layout>
          )
        }></Route>
    </Switch>
  );
};

export default App;
