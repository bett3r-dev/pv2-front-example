import { useState,  useContext, createContext } from 'react';
// import {CartErrors}  from "@bett3r-dev/pv2-template-domain";
const errorContext = createContext();

export function ProvideError({ children }) {
  const _error = useProvideError();
  return <errorContext.Provider value={_error}>{children}</errorContext.Provider>;
}

export default function useError() {
  return useContext(errorContext);
}

function useProvideError() {
  const [error, setError] = useState(); 
  
  
  const createError = (error) => {
      const errorMap = {
        CartAlreadyExist: "El carrito que intenta crear ya existe.",
        EmptyCart: "El carrito no puede estar vacío.",
        NegativeQuantity: "No puede ingresar una cantidad menor a 0.",
        ProductAlreadyInCart: "El producto que intenta agregar ya está en el carrito.",
        ProductDoesNotExist: "El producto que intenta agregar no existe.",
        ProductOutOfStock: "Producto fuera de stock, intente ingresar una cantidad inferior.",
        CartDoesNotExist: "El carrito no existe.",
      }
      setError(errorMap[error] || error)
  }
  const clearError = () =>{
      setError("");
  }
 

  return {
    error,
    createError,
    clearError
  };
}
