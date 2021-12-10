import Checkbox from "../../components/common/Checkbox"
import FormTitle from "../../components/common/FormTitle"
import Select from "../../components/common/Select"
import TextArea from "../../components/common/TextArea"
import TextBox from "../../components/common/TextBox"
import ToggleButton from "../../components/common/ToggleButton"
import useTranslation from "../../hooks/useTranslation"

export default function Demo(props){
    const {__} = useTranslation();
    return(
        <div className="container mx-auto px-4 py-4 mb-24 ">
        <FormTitle label={__('Inputs')}/>
        <Select multiSelect label={__('Multi select')} />
        <Select label={__('Select')} />
        <TextBox label={__('Textbox + Success message')} successMessage={__('Perfecto!')} />
        <TextBox label={__('Textbox + Error message')} icon={true} errorMessage={__('Muy mal!')}> <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-mail' width={20} height={20} viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'> <path stroke='none' d='M0 0h24v24H0z' /> <rect x={3} y={5} width={18} height={14} rx={2} /> <polyline points='3 7 12 13 21 7' /> </svg> </TextBox>
        <TextBox label={__('Textbox + Icon right')} icon={true} iconRight={true}> <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-mail' width={20} height={20} viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'> <path stroke='none' d='M0 0h24v24H0z' /> <rect x={3} y={5} width={18} height={14} rx={2} /> <polyline points='3 7 12 13 21 7' /> </svg> </TextBox>
        <TextArea label={__('TextArea')} />
        <Checkbox label={__('Checkbox')} />
        <ToggleButton text={__('Toggle button')} />
        </ div>
    )
}