import { useCallback, useEffect, useState } from "react";
import useTranslation from "../../hooks/useTranslation";
import Alert from "../../components/common/Alert";
import Button from "../../components/common/Button";
import Spinner from "../../components/common/Spinner";
import TextBox from "../../components/common/TextBox";

export default function RegisterForm(props){
  const {registerUser, login, isError, isLoading } = props;
  const {__} = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassord] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassord] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [isValid, setIsValid] = useState(false);
  
  const isValidEmail = value =>  /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
  const handleClickShowPassword = () => setShowPassord(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassord(!showConfirmPassword);
  
  const handleOnBlurEmail = () => {
    if(email !== '' && !isValidEmail(email)) setEmailError(true);
    else setEmailError(false);
  }
  const handleOnBlurConfirmPassword = () => {
    if(password !== confirmPassword) setPasswordError(true);
    else setPasswordError(false);
  }

  const validateForm = useCallback(() => {
    return  email && isValidEmail(email) &&
      password && password === confirmPassword
  }, [email, password, confirmPassword])

  useEffect(() => setIsValid(validateForm()), [validateForm]);

  return (
    <div className='flex items-center justify-center w-full'>
      <div className='w-11/12 space-y-6 flex flex-col'>
        <div className='text-3xl font-bold text-center'>
          {__('Register')}
        </div>
        {isError && (
            <Alert type='error'>{isError}</Alert>
        )}
        <form
          className='flex flex-col'
          onSubmit={(e) => {
            e.preventDefault();
            registerUser({ email, password });
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
          <TextBox
            placeHolder={__('Confirm Password')}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={handleOnBlurConfirmPassword}
          />
          </form>
          {isLoading ? (
            <Button type={'disabled'}>
              <Spinner className='text-body' />
            </Button>
          ) : (
            <Button type={`${ isValid ? 'primary' : 'disabled'}`} className={'justify-center uppercase'} label={__('Register')} />
          )}
          <div className='flex flex-col pt-0 mt-0'>
                <button className={`base-navbar-link text-sm uppercase`} onClick={(e)=> {e.preventDefault(); login();}}>
                   {__('Sign In')}
                </button>
          </div>
      </div>
    </div>
  )
}