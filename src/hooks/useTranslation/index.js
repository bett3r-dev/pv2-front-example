import { useState, useEffect, useContext, createContext } from 'react';

const translationContext = createContext();

export function ProvideTranslation({ children }) {
  const _translation = useProvideTranslation();
  return <translationContext.Provider value={_translation}>{children}</translationContext.Provider>;
}

export default function useTranslation() {
  return useContext(translationContext);
}

function useProvideTranslation() {
  const [/* lang */, setLang] = useState(); 
  useEffect(() => { //logica language detector + query params + eleccion
   const userLang = navigator.language || navigator.userLanguage; 
   const searchParams = new URLSearchParams( window.location.search );
   const paramLang = searchParams.get( 'lang' ) || undefined;
   setLang(paramLang || userLang.substring(0, 2))
  }, []);
  
  const changeLanguage = (language) => {
      setLang(language)
  }
  const __ = (sentenceToTranslate) => { 
    // getLangFile (usando lang del useState)
    // si está la sentence, devolverla y si no retornarla como llegó
    return sentenceToTranslate;
  };

  return {
    __,
    changeLanguage
  };
}
