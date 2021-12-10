import { useCallback, useEffect, useState } from "react";
import Alert from "../../components/common/Alert";
import Button from "../../components/common/Button";
import Spinner from "../../components/common/Spinner";
import TextBox from "../../components/common/TextBox";
import useTranslation from "../../hooks/useTranslation";

export default function LoginForm(props){
  const {loginUser, register, isError, isLoading, forgotPassword } = props;
  const {__} = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassord] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [isValid, setIsValid] = useState(false);
  const isValidEmail = value =>  /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)

  const handleClickShowPassword = () => {
    setShowPassord(!showPassword)
  };
  const handleOnBlurEmail = () => {
      if(email !== '' && !isValidEmail(email)) setEmailError('Invalid Email');
      else setEmailError(false);
  }
  const validateForm = useCallback(() => {
      return  password && email && isValidEmail(email)
  }, [email, password])

  useEffect(() => setIsValid(validateForm()), [validateForm]);

  return (
    <div className='flex items-center justify-center w-full'>
      <div className='w-11/12 space-y-5 flex flex-col'>
        <div className='text-3xl font-bold text-center'>
        {__('Sign In')}
        </div>
        {isError && (
            <Alert type='error' title={__('Error')} message={isError}></Alert>
        )}
        <form
          className='flex flex-col'
          onSubmit={(e) => {
            e.preventDefault();
            loginUser({ email, password });
          }}>
          <TextBox
            label={__('E-mail')}
            placeHolder={__('E-mail')}
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            errorMessage={emailError}
            onBlur={handleOnBlurEmail}
          />
          <TextBox
            label={__('Password')}
            placeHolder={__('Password')}
            onChange={(e) => setPassword(e.target.value)}
          />
          </form>
          {isLoading ? (
            <Button type={'disabled'}>
              <Spinner className='text-body' />
            </Button>
          ) : (
            <Button type={`${ isValid ? 'primary' : 'disabled'}`} className={'justify-center uppercase'} label={__('Sign In')} />
          )}
          <div className='flex flex-col space-y-2'>
                <button className={`base-navbar-link text-sm uppercase`} onClick={(e)=> {e.preventDefault(); register();}}>
                {__('Sign Up')}
                </button>
                <button className={`base-navbar-link text-sm uppercase`} onClick={(e)=> {e.preventDefault(); forgotPassword();}}>
                   {__('Forgot Password?')}
                </button>
          </div>
      </div>
    </div>
  )
}