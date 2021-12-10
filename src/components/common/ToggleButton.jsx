import {useState} from 'react';

function ToggleButton({text, toggledCallback, className, labelClassName, backgroundClassName, backgroundSelectedClassName, dotClassName, dotSelectedClassName}) {
  const [toggleState, setToggleState] = useState(false);
  const toggle = () => {
      setToggleState(!toggleState)
      toggledCallback && toggledCallback(!toggleState)
  }

  return (
  <div onClick={toggle} className={`base-togglebutton ${className}`}>
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <div className={`base-togglebutton-bg ${backgroundClassName} ${toggleState === true && `base-togglebutton-bg-selected ${backgroundSelectedClassName}`}`}></div>
        <div className={`base-togglebutton-dot ${dotClassName} ${toggleState === true && `base-togglebutton-dot-selected ${dotSelectedClassName}` }`}></div>
      </div>
      <div className={`base-togglebutton-label ${labelClassName}`}>
        {text}
      </div>
    </label>
  </div>
  );
}
export default ToggleButton;


