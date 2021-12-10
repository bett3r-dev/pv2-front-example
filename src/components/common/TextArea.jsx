
function TextArea({placeholder, className, inputClassName, label, labelClassName, ...rest}){
    return (
        <div className={`base-textarea ${className}`}>
        {label && <label htmlFor="field-content" className={`base-input-label ${labelClassName}`}> {label} </label>}
        <textarea id="field-content" className={`base-textarea-input ${inputClassName}`}  rows={5} {...rest}  />
        </div>
    );
  }
  
  export default TextArea;