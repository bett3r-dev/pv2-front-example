import { useState } from "react";

export default function NavbarDropdown({children, label, buttonClassName, listClassName, ...rest}) {
    const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className={'relative inline-block'}>
    <button onClick={() => setShowDropdown(!showDropdown)} className={`base-dropdown-button ${buttonClassName}`} {...rest}>
        <span className="mr-1">{label}</span>
        <svg className="text-gray-500 ml-1 h-5 w-5 hover:text-gray-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
    </button>
    
    <ul onMouseLeave={() => setShowDropdown(false)} className={`${showDropdown ?'block': 'hidden'} base-dropdown-list ${listClassName}`}>
        {children}
    </ul>
  </div>
  );
}
