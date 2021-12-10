import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useTranslation from '../hooks/useTranslation';
import Button from '../components/common/Button';
import TextBox from '../components/common/TextBox';


export default function Home(props) {
  let history = useHistory();
  const {__} = useTranslation();
  const [customButtonClass, setCustomButtonClass] = useState('');
  return (
        <main className='mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28'>
          <div className='sm:text-center lg:text-left'>
            <h1 className='text-4xl tracking-tight font-extrabold text-header sm:text-5xl md:text-6xl'>
              <span className='block '>{__('Home')}</span>
              <span className='block text-primary '>{__('title')}</span>
            </h1>
            <p className='mt-3 text-base text-body sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0'>
              {__(`Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua.`)}
            </p>
            <div className='mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start md:space-x-4'>
              <Button
                type='secondary'
                label={__('Register')}
                onClick={() => history.push('/auth/register')}
              />
              <Button label={__('Demo')} onClick={() => history.push('/demo')} />
            </div>
            <TextBox label={__('tailwind styles for button')} placeholder={__('Type your classes here...')} onChange={(e) => setCustomButtonClass(e.target.value)}/>
            <Button label={__('customize me')} className={customButtonClass} />

          </div>
        </main>
  );
}
