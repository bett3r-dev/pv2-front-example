import { useCallback, useEffect, useState } from "react";
import Alert from "../../components/common/Alert";
import Button from "../../components/common/Button";
import Spinner from "../../components/common/Spinner";
import TextBox from "../../components/common/TextBox";
import useTranslation from "../../hooks/useTranslation";

export default function ForgotPasswordForm(props){
  const {__} = useTranslation();
  const {forgotPassword, register, login, isError, isSuccess, isLoading } = props;
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false)
  const [isValid, setIsValid] = useState(false);
  const isValidEmail = value =>  /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)

  const handleOnBlurEmail = () => {
      if(email !== '' && !isValidEmail(email)) setEmailError('Invalid Email');
      else setEmailError(false);
  }
  const validateForm = useCallback(() => {
      return  email && isValidEmail(email)
  }, [email])

  useEffect(() => setIsValid(validateForm()), [validateForm]);

  return (
    <div className='flex items-center justify-center w-full'>
      <div className='w-11/12 space-y-5 flex flex-col'>
        <div className='text-3xl font-bold text-center'>
          {__('Recover Password')}
        </div>
        {isError && (
            <Alert type='error' title= {__('Error')} message={'Couldn\'t send mail'}></Alert>
        )}
        {isSuccess ? <Alert severity="success" title= {__('Success')} message= {__('Mail successfully sent!')}></Alert> :
        <form
          className='flex flex-col'
          onSubmit={(e) => {
            e.preventDefault();
            forgotPassword({ email});
          }}>
          <TextBox
            label={__('E-mail')}
            placeHolder={__('E-mail')}
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            errorMessage={emailError}
            onBlur={handleOnBlurEmail}
          />
          </form>
        }
          {isLoading ? (
            <Button type={'disabled'}>
              <Spinner className='text-body' />
            </Button>
          ) : (
            <Button type={`${ isValid ? 'primary' : 'disabled'}`} className={'justify-center uppercase'} label={__('Send Recover Mail')} />
          )}
          <div className='flex flex-col space-y-2'>
                <button className={`base-navbar-link text-sm uppercase`} onClick={(e)=> {e.preventDefault(); login();}}>
                   {__('Sign In')}
                </button>
                <button className={`base-navbar-link text-sm uppercase`} onClick={(e)=> {e.preventDefault(); register();}}>
                   {__('Register')}
                </button>
          </div>
      </div>
    </div>
  )
}