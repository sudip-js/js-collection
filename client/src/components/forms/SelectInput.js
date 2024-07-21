import React, { forwardRef } from 'react'

const SelectInput = forwardRef(({ label = '', error = null, options = [], selectValue = '', selectName = '', ...props }, ref) => {
    return (
        <div>
            {label && <label htmlFor={label} className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>}
            <select
                ref={ref}
                {...props}
                id={label}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
                <option value="">Select {label}</option>
                {options?.length > 0 ? (
                    options.map((option, index) =>
                        <option key={index} value={option[selectValue]} >{option[selectName]}</option>
                    )
                ) : <option value="">No record found</option>}
            </select>
            {error && <span className='text-red-500'>{error}</span>}
        </div>
    )
})

export default SelectInput