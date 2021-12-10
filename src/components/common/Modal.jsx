import Button from "./Button";

export default function Modal({children, title, description, confirmButtonText='Confirm', cancelButtonText='Cancel', onCancel, onConfirm, className, buttonGroupClassName, titleClassName, descriptionClassName, titleLineClassName}) {
  return (
    <div
      className={`base-modal ${className}`}
      style={{background: 'rgba(0,0,0,.2)'}}
      id='modal-id'>
      <div className='w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white '>
        <div className=''>
          <div className='text-left flex-auto justify-left'>
            {children}
            <div className={`base-modal-button-title-line ${titleLineClassName}`}>
                <h2 className={`base-modal-title ${titleClassName}`}>
                   {title}
                </h2>
            </div>
            <p className={`base-modal-description ${descriptionClassName}`}>
                {description} 
            </p>
          </div>
          <div className={`base-modal-button-group ${buttonGroupClassName}`}>
            {onCancel && <Button type={'secondary'} label={cancelButtonText} onClick={onCancel}/>}
            {onConfirm && <Button label={confirmButtonText} onClick={onConfirm} />}
          </div>
        </div>
      </div>
    </div>
  );
}
