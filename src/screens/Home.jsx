import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useTranslation from '../hooks/useTranslation';
import Button from '../components/common/Button';
import TextBox from '../components/common/TextBox';
import Spinner from '../components/common/Spinner';
import AutocompleteTextBox from '../components/common/AutocompleteTextBox';
import CartItemList from '../components/common/CartItemList';
import Alert from '../components/common/Alert';
import {v4 as uuid} from 'uuid'


export default function Home(props) {
  let history = useHistory();
  const {__} = useTranslation();
  const userId = uuid();
  const [isCartCreated, setIsCartCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [cartItems, setCartItems] = useState([])
  const [userCartId, setUserCartId] = useState(uuid())
  const [error, setError] = useState();

  
  const createCart = () =>{
    setIsLoading(true)
    post({endpoint:`carts/${userCartId}/create-user-cart`, data:{cartId: userCartId}})
      .then(res =>{
        console.log('create cart res', res)
        fetch('http://localhost:1984/products/readmodel')
          .then(response => response.json())
          .then(res => {
            console.log(res)
            setProductList([...res])
            setIsCartCreated(true)
            setIsLoading(false)
          })
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
    post({endpoint: `carts/${userCartId}/add-product`, data:{productId: itemToAdd.id, productInfo: itemInfo, quantity: 1}})
      .then(res =>{
        console.log(res)
        const newCartItems = cartItems;
        newCartItems.push({item: itemToAdd, quantity: 1})
        setCartItems([...newCartItems]);
        setSelectedOption("")
      })
    // const newCartItems = [...cartItems];
    // newCartItems.push({item: itemToAdd, quantity: 1})
    // setCartItems([...newCartItems]);
    // setSelectedOption("")
   }
  }
  const updateQuantity = (quantity, itemId) => {
    // const itemToUpdate = cartItems.find(item => item.item.id === itemId);
    // post({endpoint: `/cart/${userCartId}/update-quantity`, data:{ product: itemToUpdate, quantity: quantity}})
    //   .then(res =>{
    //     if ok
        const newCartItemList = [...cartItems]
        Object.assign(newCartItemList.find(item => item.item.id === itemId),{quantity: quantity});
        setCartItems([...newCartItemList])
      // })
  }
  const removeCartItem = (itemId) =>{
    // post({endpoint: `/cart/${userCartId}/remove-product`, data: itemId})
    //   .then(res => {
    //     if ok
        const newCartItemList = cartItems.filter(item => item.item.id !== itemId)
        setCartItems([...newCartItemList]);
    // })
  }
  const closeCart = () => { //TODO: CAMBIAR A START PAYMENT
     // post({endpoint: `/cart/${userCartId}/close-cart`)
    //   .then(res => {
    //     if ok
    // })
  }
  return (
        <main className='mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28'>
          <div className='sm:text-center lg:text-left'>
            <h1 className='text-4xl tracking-tight font-extrabold text-header sm:text-5xl md:text-6xl'>
              <span className='block '>{__('Cart')}</span>
              <span className='block text-primary '>{__('PV2 example')}</span>
            </h1>
            {error && <Alert title={__('Error')} type={'error'} message={error}/>}
            <div className='mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start md:space-x-4'>
              {isLoading ?
                <div className='mx-5 mt-5'><Spinner/></div> 
              :
              <>
                { isCartCreated ?
                  <AutocompleteTextBox label={__('Añada un producto al carrito')} options={productList} value={selectedOption} onChange={addCartItem}/>
                  :
                  <Button label={__('Iniciar Compra')} onClick={() => createCart()} />
                }
              </>
            }
            </div>
            {cartItems.length > 0 && <CartItemList itemList={cartItems} updateQuantity={updateQuantity} removeCartItem={removeCartItem} />}
            {cartItems.length > 0 && <div class="float-right mb-36"><Button className="primary" label={__('Finalizar')} onClick={()=> closeCart()} /></div>}
          </div>
        </main>
  );
}



async function post({endpoint, data}) {
  const response = await fetch(`http://localhost:1984/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
}