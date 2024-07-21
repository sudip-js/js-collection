import React from 'react'
import { useNavigate } from 'react-router-dom'

const Success = () => {
    const navigate = useNavigate();
    return (
        <div class="min-h-screen bg-white dark:bg-zinc-900 flex flex-col">
            <div class="flex-1 flex flex-col lg:flex-row items-center justify-center p-8">
                <div class="lg:w-1/2 w-full text-center lg:text-left">


                    <h1 className='text-2xl font-bold text-zinc-900 dark:text-white mb-4'>Payment Successful</h1>
                    <p className='text-zinc-600 dark:text-zinc-300 mb-2'>Thank you for shopping with us!</p>
                    <p className='text-zinc-600 dark:text-zinc-300 mb-2'>Your order will be processed and shipped within the next two business days.</p>
                    <p className='text-zinc-600 dark:text-zinc-300 mb-5'>If you have any questions or need further assistance, please contact our customer support.</p>

                    <div class="flex items-center mb-8">
                        <div class="flex items-center">
                            <div class="bg-green-600 text-white rounded-full h-8 w-8 flex items-center justify-center">
                                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <span class="ml-2 text-zinc-900 dark:text-white">Sites selected</span>
                        </div>
                        <div class="flex-1 h-1 bg-zinc-300 mx-2"></div>
                        <div class="flex items-center">
                            <div class="bg-green-600 text-white rounded-full h-8 w-8 flex items-center justify-center">
                                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <span class="ml-2 text-zinc-900 dark:text-white">Payment received</span>
                        </div>
                        <div class="flex-1 h-1 bg-zinc-300 mx-2"></div>
                        <div class="flex items-center">
                            <div class="bg-zinc-300 text-zinc-600 rounded-full h-8 w-8 flex items-center justify-center">
                                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3"></path>
                                </svg>
                            </div>
                            <span class="ml-2 text-zinc-600 dark:text-zinc-400">Processing report</span>
                        </div>
                    </div>

                    <div class="flex justify-center lg:justify-start space-x-4">
                        <button onClick={() => navigate('/')} type='button' class="border border-green-600 text-green-600 px-4 py-2 rounded-md hover:bg-green-50">Back Home</button>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Success