import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useTranslation from '../hooks/useTranslation';
import Button from '../components/common/Button';
import Spinner from '../components/common/Spinner';
import AutocompleteTextBox from '../components/common/AutocompleteTextBox';
import CartItemList from '../components/common/CartItemList';
import Alert from '../components/common/Alert';
import {v4 as uuid} from 'uuid'
import useSubscription from '../hooks/useSubscription';
import useEndpoint from '../hooks/useEndpoint';
import CartInvoice from '../components/common/CartInvoice';
import useError from '../hooks/useError';


export default function Home(props) {
  let history = useHistory();
  const {__} = useTranslation();
  const subscriptions = useSubscription();
  const {get, post} = useEndpoint();
  const {error, createError, clearError} = useError();
  const userId = uuid();
  const [isCartCreated, setIsCartCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("")
  const [productList, setProductList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [cartItems, setCartItems] = useState([])
  const [userCartId, setUserCartId] = useState(uuid())
  const [success, setSuccess] = useState();
  const [invoice, setInvoice] = useState();

  
  const createCart = () =>{
    setIsLoading(true)
    clearError("")
    setSuccess("")
    setLoadingMessage("Iniciando Compra")
    post({endpoint:`/carts/${userCartId}/create-user-cart`})
      .then(res =>{
        if(res.error){
          createError(res.error)
          setIsLoading(false)
          setLoadingMessage("")
        }else{
       get({endpoint: '/products/readmodel'})
          .then(res => {
            setProductList([...res])
            setIsCartCreated(true)
            setIsLoading(false)
            setLoadingMessage("")
          })
        }
      })
      .catch((error) => {
        createError(error)
        setIsLoading(false)
        setLoadingMessage("")
      })
  }
  const addCartItem = (itemToAdd) =>{
    setSelectedOption(itemToAdd.name || itemToAdd)
   if(itemToAdd && productList.includes(itemToAdd)){ 
     const itemInfo = {
      name: itemToAdd.name,
      price: itemToAdd.price,
      sku: itemToAdd.sku,
     }
    post({endpoint: `/carts/${userCartId}/add-product`, data:{productId: itemToAdd.id, productInfo: itemInfo, quantity: 1}})
      .then(res =>{
        if(res.error){
          createError(res.error)
        }else{
        const newCartItems = cartItems;
        newCartItems.push({item: itemToAdd, quantity: 1})
        setCartItems([...newCartItems]);
        setSelectedOption("")
        }
      })
      .catch(error => createError(error))
   }
  }
  const updateQuantity = (quantity, itemId) => {
    const itemToUpdate = cartItems.find(item => item.item.id === itemId);
    post({endpoint: `/carts/${userCartId}/update-quantity`, data:{ productId: itemToUpdate.item.id, quantity: quantity}})
      .then(res =>{
        if(res.error || !res.state){
          createError(res.message || res.ProductOutOfStock.name || undefined)
        }else{
        const newCartItemList = [...cartItems]
        Object.assign(newCartItemList.find(item => item.item.id === itemId),{quantity: quantity});
        setCartItems([...newCartItemList])
        }
      })
      .catch(error => createError(error))
  }
  const removeCartItem = (itemId) =>{
    post({endpoint: `/carts/${userCartId}/remove-product`, data: itemId})
      .then(res => {
        if(res.error){
          createError(res.error)
        }else{
        const newCartItemList = cartItems.filter(item => item.item.id !== itemId)
        setCartItems([...newCartItemList]);
        }
    })
    .catch(error => createError(error.message))
  }
  const startPayment = () => { 
    setIsLoading(true)
    setLoadingMessage("Procesando  Pago")
    subscriptions.socketConnect()
        .then(() => {
          subscriptions.subscribe('PaymentApproved')
            .map(() => subscriptions.unsubscribe('PaymentApproved'))
            .map(() => setSuccess("Pago Aprobado"))
            .map(()=> setLoadingMessage("Generando Factura"))
            .map(()=> emptyCart())
          subscriptions.subscribe('InvoiceCreated')
            .map(data => setInvoice({...data}))
            .map(() => subscriptions.unsubscribe('InvoiceCreated'))
            .map(()=> subscriptions.socketDisconnect())
            .map(()=> setIsLoading(false))
            .map(()=> setLoadingMessage(""))
          subscriptions.subscribe('PaymentRejected')
            .map(console.log)
            .map(() => createError("El pago ha sido rechazado, intente nuevamente"))
            .map(() => subscriptions.unsubscribe('PaymentRejected'))
            .map(()=> subscriptions.socketDisconnect())
            .map(()=> setIsLoading(false))
            .map(()=> setLoadingMessage(""))
        })
        .then(()=>{
          post({endpoint: `/payments/${userCartId}/start-payment`, data: {}})
          .then(res => {
            if(res.error){
              createError(res.error)
              setIsLoading(false)
              setLoadingMessage("")
              subscriptions.unsubscribe('PaymentApproved')
              subscriptions.unsubscribe('PaymentRejected')
            }else{
            console.log('paymentstart call', res)
              
            }
        })
        .catch(error => createError(error.message))
        })
  }
  const emptyCart = () =>{
    setIsCartCreated(false)
    setCartItems([])
    setUserCartId(uuid())
  }

  return (
        <main className='mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28'>
          <div className='sm:text-center lg:text-left'>
            <h1 className='text-4xl tracking-tight font-extrabold text-header sm:text-5xl md:text-6xl'>
              <span className='block '>{__('Cart')}</span>
              <span className='block text-primary '>{__('PV2 example')}</span>
            </h1>
            {error && <div className="mt-4"><Alert title={'Error'} type={'error'} message={error} onDismiss={() => clearError("")}/></div>}
            {success && <div className="mt-4"><Alert title={'Éxito'} type={'success'} message={success} onDismiss={() => setSuccess("")}/></div>}
            <div className='mt-5 sm:mt-8 sm:justify-center lg:justify-start md:space-x-4'>
              {isLoading ?
              <div className="flex flex-col">
                <div className='mx-5 mt-5'><Spinner/></div> 
                {loadingMessage && <div className={`base-progressbar mt-4`}><div><span className={`base-progressbar-task`}> {loadingMessage} </span></div></div> }
              </div>
              :
              <>
                { isCartCreated ?
                  <AutocompleteTextBox label={__('Añada un producto al carrito')} options={productList} value={selectedOption} onChange={addCartItem}/>
                  :
                  <>
                  { invoice ?
                    <>
                      <div className="w-full">
                        <Button label={__('Iniciar Otra Compra')} onClick={() => createCart()} />
                      </div>
                      <CartInvoice invoice={invoice}></CartInvoice>
                    </>
                    :
                      <Button label={__('Iniciar Compra')} onClick={() => createCart()} />
                  }
                  </>
                }
              </>
            }
            </div>
            {cartItems?.length > 0 && !isLoading && <CartItemList itemList={cartItems} updateQuantity={updateQuantity} removeCartItem={removeCartItem} />}
            {cartItems?.length > 0 && !isLoading && <div className="float-right mb-36"><Button className="primary" label={__('Finalizar')} onClick={()=> startPayment()} /></div>}
          </div>
        </main>
  );
}

