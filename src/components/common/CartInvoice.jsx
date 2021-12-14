const CartProduct = ({product}) => {
    return(
        <div className="grid grid-cols-9 gap-4">
            <div className="col-span-6 flex items-center"> 
                <div className="flex flex-col ml-3"> 
                <span className="md:text-md font-medium">{product.productInfo.name}</span> 
                <span className="text-xs font-light text-gray-400">#{product.productId}</span>
                </div>
            </div>
            <div className="col-span-1 flex justify-center items-center">
                    <span className="text-xs font-medium">${product.productInfo.price }</span>
            </div>
            <div className="col-span-1 flex justify-center items-center">
                    <span className="text-xs font-medium"> {product.quantity} </span>
            </div>
            <div className="col-span-1 flex justify-center items-center">
                   <span className="text-xs font-medium">${product.productInfo.price * product.quantity}</span>
            </div>
        </div>
    )
}

const CartInvoice = ({invoice}) =>{
    return(
        <div className="w-full p-4 px-5 py-5 mt-8">
            <div className="gap-2 ">
                <div className="grid grid-cols-9 gap-4 mb-4">
                    <div className="col-span-6 flex items-center">
                        <span className="text-md font-medium">Producto</span>
                    </div>
                    <div className="col-span-1 flex justify-center items-center">
                        <span className="text-md font-medium">Precio unitario</span>
                    </div>
                    <div className="col-span-1 flex justify-center items-center">
                        <span className="text-md font-medium">Cantidad</span>
                    </div>
                    <div className="col-span-1 flex justify-center items-center">
                        <span className="text-md font-medium">Total</span>
                    </div>
                </div>
                <div className="flex justify-between items-center pt-6 mt-6 border-t"></div>
                    {Object.keys(invoice.products).map((productKey, key) =>{
                        return(
                            <div key={key}>
                                <CartProduct  product={invoice.products[productKey]}/>
                                <div className="flex justify-between items-center pt-6 mt-6 border-t"></div>
                            </div>
                        )
                    })}
                <div className="flex justify-between mb-36">
                    <span className="text-md font-medium">Total:</span>
                    <span className="text-md font-medium">${invoice.total}</span>
                </div>
            </div>
        </div>
    )
}

export default CartInvoice;
