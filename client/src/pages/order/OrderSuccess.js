import React from 'react'
import { Link } from 'react-router-dom'

const OrderSuccess = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl text-center">
                <div className="relative flex justify-center mb-6">
                    <div className="bg-[#4F46E5] rounded-full p-4">
                        <img
                            aria-hidden="true"
                            alt="check-mark"
                            src="https://openui.fly.dev/openui/48x48.svg?text=✔"
                            className="w-12 h-12"
                        />
                    </div>
                    <div className="absolute inset-0 flex justify-center items-center">
                        <div className="bg-[#4F46E5] rounded-full h-24 w-24 animate-ping"></div>
                    </div>
                </div>
                <h2 className="text-2xl font-semibold mb-2">Thank you for ordering!</h2>
                <p className="text-zinc-500 mb-6">
                    <h1 className='mb-2'>We are pleased to inform you that your cash payment order has been successfully processed.
                    </h1>
                    <p className='mb-2'>
                        Your order is now being prepared and will be dispatched shortly. We will notify you once your order is shipped.
                    </p>
                    <p className='mb-2'>
                        If you have any questions or need further assistance, please feel free to contact our customer service team at sudip.github@gmail.com/9315797998
                    </p>
                </p>
                <div>
                    <Link to="/">
                        <button type='button' className="bg-[#4F46E5] text-white py-2 px-4 rounded">
                            Continue Shopping
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default OrderSuccess