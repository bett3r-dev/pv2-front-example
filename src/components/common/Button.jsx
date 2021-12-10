function Button({ children, label, type='primary', className, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${label ? 'base-button' : 'base-button-icon'} base-button-${type} ${className}`}>
      {children && <span className={`h-5 w-5 ${label ? 'mr-2' : null}`}>
          {children}
      </span>
      }
      {label && <span>
            {label}
        </span>
      }
    </button>
  );
}
        
export default Button;
//primary secondary y disabled