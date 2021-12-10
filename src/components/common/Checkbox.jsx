function Checkbox({checked, onChange, label, labelClassName, inputClassName}){
  return (
    <label className={`base-checkbox-label ${labelClassName} `}>
      <input type="checkbox" className={`form-checkbox base-checkbox-input ${inputClassName}`} checked={checked} onChange={onChange} /><span className="ml-2">{label}</span>
    </label>
  );
}

export default Checkbox;