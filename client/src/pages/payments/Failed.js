import React from 'react'
import { useNavigate } from 'react-router-dom'

const Failed = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-900 flex flex-col">
            <div className="flex-1 flex flex-col lg:flex-row items-center justify-center p-8">
                <div className="lg:w-1/2 w-full text-center lg:text-left">
                    <h1 className='text-2xl font-bold text-zinc-900 dark:text-white mb-4'>Payment Failed</h1>
                    <p className='text-zinc-600 dark:text-zinc-300 mb-2'>We encountered an issue processing your payment.</p>
                    <p className='text-zinc-600 dark:text-zinc-300 mb-2'>Please try again or contact our customer support for assistance.</p>
                    <p className='text-zinc-600 dark:text-zinc-300 mb-5'>We apologize for the inconvenience.</p>

                    <div className="flex items-center mb-8">
                        <div className="flex items-center">
                            <div className="bg-red-600 text-white rounded-full h-8 w-8 flex items-center justify-center">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </div>
                            <span className="ml-2 text-zinc-900 dark:text-white">Payment failed</span>
                        </div>
                        <div className="flex-1 h-1 bg-zinc-300 mx-2"></div>
                        <div className="flex items-center">
                            <div className="bg-zinc-300 text-zinc-600 rounded-full h-8 w-8 flex items-center justify-center">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3"></path>
                                </svg>
                            </div>
                            <span className="ml-2 text-zinc-600 dark:text-zinc-400">Retry payment</span>
                        </div>
                    </div>

                    <div className="flex justify-center lg:justify-start space-x-4">
                        <button onClick={() => navigate('/')} type='button' className="border border-zinc-600 text-zinc-600 px-4 py-2 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-800">Back Home</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Failed
