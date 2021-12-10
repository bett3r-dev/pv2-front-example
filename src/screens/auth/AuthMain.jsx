import {useState, useEffect, useCallback} from 'react';
// import useAuth from '../../src/hooks/useAuth';
import NoContentAuth from './NoContentAuth.jsx'
import LoginForm from './LoginForm.jsx'
import RegisterForm from './RegisterForm.jsx'
import PasswordRecoverForm from './PasswordRecoverForm.jsx'
import ForgotPasswordForm from './ForgotPasswordForm.jsx'


import { Router, useHistory } from 'react-router-dom';
import ContentLeftAuth from './ContentLeftAuth.jsx';
import useTranslation from '../../hooks/useTranslation/index.js';

const AuthMain = ({match}) => {
//   const { signin, signup } = useAuth();  
  let history = useHistory();
  const {__} = useTranslation();
  const [form, setForm] = useState('loading');
  const [token, setToken] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const renderForm = form => {
    ['login', 'register', 'forgotPassword', 'passwordRecover'].includes(form) && history.push(`/auth/${form}`)
    setIsError(false)
    setForm(form);
  }

//   const loginUser = useCallback((user)=>{
//     setIsLoading(true);
//     setIsError(false);
//     signin(user.email, user.password)
//       .then(() => {
//         const c = router.query.continue;
//         router.push(`${c || '/'}`);
//       })
//       .catch(err => {
//         setIsLoading(false);
//         setIsError(err.message);
//       });
//   },[]);

//   const registerUser = useCallback((user)=>{
//     setIsLoading(true);
//     setIsError(false);
//     signup(user.email, user.password)
//       .then((res) => {
//         if(res.errorMessage){
//           setIsLoading(false);
//           setIsError(res.errorMessage);
//         }else{
//           renderForm('login')
//           setIsLoading(false);
//         }
//       })
//   },[]);

//   const forgotPassword = async (recoverEmail)=>{
//     setIsLoading(true);
//     setIsError(false);
//     // const res = await fetch({url: '/sendRecoverPasswordMail', params: { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({email: recoverEmail}) }})
//     // if(res?.errorMessage){
//     //   setIsLoading(false);
//     //   setIsError(res.errorMessage);
//     // }else{
//     //   setIsLoading(false);
//     //   setIsSuccess(true);
//     // }
//   }
 
//   const passwordRecover = async ({token, password})=>{
//     setIsLoading(true);
//     setIsError(false);
//     // const res = await fetch({url: '/recoverPassword', params: { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({token, password}) }})

//     // if(res?.errorMessage){
//     //   setIsLoading(false);
//     //   setIsError(res.errorMessage);
//     // }else{
//     //   setIsLoading(false);
//     //   setIsSuccess(true);
//     // }
//   }
  

  useEffect(() => {
    if (match.path === '/auth/register') {
      renderForm('register');
    } else if (match.path === '/auth/forgotPassword') {
      renderForm('forgotPassword')
    }else if (match.path === '/auth/passwordRecover') {
      renderForm('passwordRecover')
    //   setToken(query?.oobCode || null); // location.search regex oobCode/token
    }else {
      renderForm('login');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.path])

  const forms = {
    loading:() => <div>{__('loading')}</div>,
    login:() => <LoginForm loginUser={() =>{}} register={() => renderForm('register')} isError={isError} isLoading={isLoading} forgotPassword={() => renderForm('forgotPassword')} />, 
    register:() => <RegisterForm registerUser={() =>{}} login={() => renderForm('login')}  isError={isError} isLoading={isLoading}/>,
    forgotPassword:() => <ForgotPasswordForm forgotPassword={() =>{}} isSuccess={isSuccess} register={() => renderForm('register')} login={() => renderForm('login')} isError={isError} isLoading={isLoading}/>,
    passwordRecover: () => <PasswordRecoverForm  passwordRecover={() =>{}} token={token} isSuccess={isSuccess} isError={isError} isLoading={isLoading} login={() => renderForm('login')}/>,
  };

  return (
    <ContentLeftAuth>
        {forms[form]()}
    </ContentLeftAuth>
  );
};

export default AuthMain;
