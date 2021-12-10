import InputSuccessMessage from './InputSuccessMessage.jsx'
import InputErrorMessage from './InputErrorMessage.jsx'

function TextBox({children, placeholder, className, inputClassName, label, labelClassName, icon, iconRight=false, successMessage, errorMessage, ...rest}){
  return (
    <div className={`base-textbox ${className}`}>
      {label && <label htmlFor="field-content" className={`base-input-label ${labelClassName}`}>{label}</label>}
      {icon ?
        <div className='relative base-icontextbox'>
          <div className={`base-icontextbox-icon ${iconRight ? 'right-0' : 'left-0'} ${className}`}>
              {children}
          </div>
          <input type="text" className={`base-icontextbox-input ${iconRight? 'pr-10' : 'pl-10'} ${inputClassName}`} {...rest}/>
        </div>
        :
        <input type="text"  className={`base-textbox-input ${inputClassName}`} {...rest} />
      }
      {successMessage && <InputSuccessMessage message={successMessage} />}
      {errorMessage && <InputErrorMessage message={errorMessage} />}
    </div>
  );
}

export default TextBox;


