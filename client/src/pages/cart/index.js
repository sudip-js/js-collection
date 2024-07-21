import React, { useState } from 'react'
import { CheckoutForm, ShoppingCart } from '../../components'

const Cart = () => {
    const [addressKey, setAddress] = useState(null);
    const [orderType, setOrderType] = useState('card');
    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-2">
                    <CheckoutForm {...{ setAddress, setOrderType }} />
                </div>
                <div className="lg:col-span-3">
                    <ShoppingCart {...{ address: addressKey, orderType }} />
                </div>
            </div>
        </div>
    )
}

export default Cart
