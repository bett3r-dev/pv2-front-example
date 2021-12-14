import { useEffect, useRef, useState } from "react"
import TextBox from "./TextBox"




const AutocompleteTextBox = ({label, options, value, onChange}) =>{
    const [showOptions, setShowOptions] = useState(false)
    const [cursor, setCursor] = useState(-1)
    const ref = useRef();

    const select = option => {
        onChange(option)
        setShowOptions(false)
    }

    const handleChange = text => {
        onChange(text);
        setCursor(-1);
        if(!showOptions) {
            setShowOptions(true)
        }
    }

    const filteredOptions = options.filter(option => {
        const nameToLowerCase = option.name.toLowerCase();
        return nameToLowerCase.includes(value.toLowerCase())
    })

    const moveCursorDown = () => {
        if(cursor < filteredOptions.length - 1) {
            setCursor(c => c + 1)
        }
    }

    const moveCursorUp = () => {
        if(cursor > 0) {
            setCursor(c => c - 1)
        }
    }

    const handleNav = (e) => {
        switch (e.key) {
            case "ArrowUp":
                moveCursorUp();
                break;
            case "ArrowDown":
                moveCursorDown();
                break;
            case "Enter":
                if(cursor >= 0 && cursor < filteredOptions.length) {
                    select(filteredOptions[cursor]);
                }
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        const listener = e => {
            if(!ref?.current?.contains(e.target)) {
                setShowOptions(false)
                setCursor(-1)
            }
        };
        
        document.addEventListener('click', listener)
        document.addEventListener('focusin', listener)
        return () => { 
            document.removeEventListener('click', listener); 
            document.removeEventListener('focusin', listener); 
        }
    },[]);
    return(
        <div className="relative w-full" ref={ref} >
        <TextBox className="w-full" label={label}  value={value} onChange={e => handleChange(e.target.value)} onFocus={()=> setShowOptions(true)} onKeyDown={handleNav} />
        {(value !== "") && <div>
        <ul className={`absolute w-full rounded-lg shadow-lg z-10 bg-white py-1 mt-2 ${!showOptions && 'hidden'} select-none`}>
                {filteredOptions.length > 0 ? filteredOptions.map((option, i, arr) => {
                let className = "px-4 hover:bg-gray-100 "

                if(i === 0)
                    className += "pt-2 pb-1 rounded-t-lg"
                else if(i === arr.length)
                    className += "pt-1 pb-2 rounded-b-lg"
                else if(i ===0 && arr.length === 1)
                    className += "py-2 rounded-lg"
                else 
                    className += "py-1"

                if(cursor === i) {
                    className += " bg-gray-100"
                }
                console.log('quehay aca', option)
                return <li className={className} 
                    key={option}
                    onClick={() => select(option)}
                    >{option.name}</li>
            }) : <li className="px-4 py-2 text-gray-500">No se encontraron productos.</li>}          
            </ul>
        </div>}
    </div>
    )
}

export default AutocompleteTextBox