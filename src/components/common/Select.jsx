import { useState } from 'react';
import InputSuccessMessage from './InputSuccessMessage.jsx'
import InputErrorMessage from './InputErrorMessage.jsx'


const opts = ['Option 1', 'Option 2','Option 3','Option 4', 'Option 5', 'Option 6', 'Option 7'];

export default function Select({options=opts, placeholder='Choose item...', label, multiSelect=false, successMessage, errorMessage, selectedCallback, className, labelClassName, selectedClassName, unselectedClassName}) {
  const [selected, setSelected] = useState([]);
  const [displayOptions, setDisplayOptions] = useState(false);

  const handleSelectItem = (option) => {
    let selectedOptions = [...selected];
    if(multiSelect){
      if ( selected.includes(option) ) selectedOptions = selectedOptions.filter(selected => selected !== option)
      else selectedOptions.push(option)
    }else{
      selectedOptions = [option]
    }
    setSelected(selectedOptions)
    setDisplayOptions(false)
    selectedCallback && selectedCallback(selectedOptions)
  }

  return (
    <div className='mt-3'>
      <label id='label' className={`base-input-label ${labelClassName}`}>
        {label}
      </label>
      <div className='mt-2 relative'>
        <button onClick={() => setDisplayOptions(!displayOptions)} type='button'  className={`base-select ${className}`}>
          <span className='flex items-center'>
            <span className='ml-3 block truncate'>{selected.length ? selected.join(', ') : placeholder}</span>
          </span>
          <span className='ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
            <svg className='h-5 w-5 text-gray-400' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
              <path fillRule='evenodd' d='M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z' clipRule='evenodd' />
            </svg>
          </span>
        </button>
        {displayOptions &&
          <ul onMouseLeave={() => setDisplayOptions(false)} className='ease-in-out absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm' >
            {options.map((option, index) => {
              return(
              <li onClick={(e) => { e.stopPropagation(); handleSelectItem(option);}} key={index} className={`${selected.includes(option) ? `base-select-selected ${selectedClassName}` :`base-select-unselected ${unselectedClassName}`}`} id={`listbox-option-${index}`}>
                <div className='flex items-center'>
                  <span className='font-normal ml-3 block truncate'>{option}</span>
                </div>
              {selected.includes(option)  &&
                <span className='text-white absolute inset-y-0 right-0 flex items-center pr-4'>
                  <svg className='h-5 w-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                    <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                  </svg>
                </span>
                }
              </li>
              )
            })}
          </ul>
      }
      </div>
      {successMessage && <InputSuccessMessage message={successMessage} />}
      {errorMessage && <InputErrorMessage message={errorMessage} />}
    </div>
  );
}
