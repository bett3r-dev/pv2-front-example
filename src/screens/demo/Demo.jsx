import { useState } from "react"
import Alert from "../../components/common/Alert"
import Button from "../../components/common/Button"
import Checkbox from "../../components/common/Checkbox"
import FormTitle from "../../components/common/FormTitle"
import Modal from "../../components/common/Modal"
import ProgressBar from "../../components/common/ProgressBar"
import Select from "../../components/common/Select"
import Spinner from "../../components/common/Spinner"
import TextArea from "../../components/common/TextArea"
import TextBox from "../../components/common/TextBox"
import ToggleButton from "../../components/common/ToggleButton"
import useTranslation from "../../hooks/useTranslation"

export default function Demo(){
  const {__} = useTranslation();
  const [showModal, setShowModal] = useState(false)
    return(
        <>
        <FormTitle label={__('Inputs')}/>
        <TextBox label={__('Textbox + success message')} successMessage={__('Perfecto!')} />
        <TextBox label={__('Textbox + error message')} icon={true} errorMessage={__('Muy mal!')}> <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-mail' width={20} height={20} viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'> <path stroke='none' d='M0 0h24v24H0z' /> <rect x={3} y={5} width={18} height={14} rx={2} /> <polyline points='3 7 12 13 21 7' /> </svg> </TextBox>
        <TextBox label={__('Textbox + icon right')} icon={true} iconRight={true}> <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-mail' width={20} height={20} viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'> <path stroke='none' d='M0 0h24v24H0z' /> <rect x={3} y={5} width={18} height={14} rx={2} /> <polyline points='3 7 12 13 21 7' /> </svg> </TextBox>
        
        <TextArea label={__('TextArea')} />
        <Select multiSelect label={__('Multi select')} />
        <Select label={__('Select')} />
        <Checkbox label={__('Checkbox')} />
        <ToggleButton text={__('Toggle button')} />
        <FormTitle label={__('Buttons')}/>
        <Button label={__('Open Modal')} onClick={() => setShowModal(true)} />
        {showModal && <Modal title={__('Modal')} description={__('This is a modal')} onCancel={() => setShowModal(false)} onConfirm={() => setShowModal(false)} />}        
        <Button label={__('Primary Button')} />
        <Button label={__('Button with Icon')}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /> </svg> </Button>
        <Button type={'secondary'} label={__('Secondary Button')}/>
        <Button type={'disabled'} label={__('Disabled Button')}/>
        <Button type={'secondary'} className={'bg-transparent'}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /> </svg> </Button>
        <Button> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /> </svg> </Button>
        <FormTitle label={__('Info')}/>
        <ProgressBar currentPercentage={30} currentTask={__('Cargando algo')}/>
        <Spinner/>
        <div className="grid grid-cols-2 gap-4 w-full">
              <TextBox />
              <TextBox />
        </div>
        <Alert title={__('Success')} message={__('Success message')}/>
        <Alert title={__('Warn')} type={'warn'} message={__('Warning message')}/>
        <Alert title={__('Error')} type={'error'} message={__('Error message')}/>
        <Alert title={__('Info')} type={'info'} message={__('Info message')}/>
        <Alert title={__('Custom')} type={'custom'} message={__('Custom Message')} customColor={'bg-primary'} dismiss={__('Adiós amigos')}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /> </svg></Alert>
        </>
    )
}