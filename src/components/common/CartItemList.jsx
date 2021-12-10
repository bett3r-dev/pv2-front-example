import Button from "./Button"
import TextBox from "./TextBox"


const CartItem = ({item, updateQuantity, removeCartItem}) => {
    return(
        <div className="flex justify-between items-center mt-6 pt-6">
            <div className="flex items-center"> 
                <div className="flex flex-col ml-3"> 
                <span className="md:text-md font-medium">{item.item.name}</span> 
                <span className="text-xs font-light text-gray-400">#{item.item.id}</span>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <div className="pr-8 flex "> 
                    <TextBox className="w-14" value={item.quantity} onChange={e => updateQuantity(e.target.value, item.item.id)} />
                </div>
                <div className="pr-8 ">
                    <span className="text-xs font-medium">${item.item.price * item.quantity}</span>
                </div>
                <div>
                    <Button type={'secondary'} label={'Remover'} onClick={() => removeCartItem(item.item.id)}/>
                </div>
            </div>
        </div>
    )
}

const CartItemList = ({itemList, updateQuantity, removeCartItem}) =>{
    return(
        <div className="w-full p-4 px-5 py-5">
            <div className="gap-2">
                <div className="col-span-2 p-5">
                    {itemList.map(item =>{
                        return(
                            <>
                                <CartItem item={item} removeCartItem={removeCartItem} updateQuantity={updateQuantity}/>
                                <div className="flex justify-between items-center pt-6 mt-6 border-t"></div>
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default CartItemList;