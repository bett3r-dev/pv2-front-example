import useTranslation from "../../hooks/useTranslation"
import Alert from "../../components/common/Alert"
import FormTitle from "../../components/common/FormTitle"
import ProgressBar from "../../components/common/ProgressBar"
import Spinner from "../../components/common/Spinner"
import TextBox from "../../components/common/TextBox"

export default function Demo(){
  const {__} = useTranslation();
    return(
        <>
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