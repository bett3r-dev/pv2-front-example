import { useState } from "react"
import Button from "../../components/common/Button"
import FormTitle from "../../components/common/FormTitle"
import Modal from "../../components/common/Modal"
import useTranslation from "../../hooks/useTranslation";

export default function Demo(){
  const {__} = useTranslation();
  const [showModal, setShowModal] = useState(false)
    return(
        <>
        <FormTitle label={__('Buttons')}/>
        <Button label={__('Open Modal')} onClick={() => setShowModal(true)} />
        {showModal && <Modal title={'Modal'} description={__('This is a modal')} onCancel={() => setShowModal(false)} onConfirm={() => setShowModal(false)} />}        
        <Button label={__('Primary Button')} />
        <Button label={__('Button with Icon')}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /> </svg> </Button>
        <Button type={'secondary'} label={__('Secondary Button')}/>
        <Button type={'disabled'} label={__('Disabled Button')}/>
        <Button type={'secondary'} className={'bg-transparent'}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /> </svg> </Button>
        <Button> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /> </svg> </Button>
        </>
    )
}