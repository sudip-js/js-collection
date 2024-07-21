import { yupResolver } from "@hookform/resolvers/yup";
import AddressList from "../address-list";
import { useForm } from "react-hook-form";
import { SelectInput, TextInput } from "../forms";
import { Country, State, City } from 'country-state-city';
import { addAddress, editAddress } from "./actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { addressesValidationSchema } from "../../schema/addressSchema";
import { useEffect, useState } from "react";
import FullScreenLoader from "../loader/FullScreen";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const initialValues = {
    name: '',
    mobile_number: '',
    pin_code: '',
    address: '',
    locality: '',
    country: '',
    state: '',
    city: '',
    address_type: 'home',
    payments_method: 'card',
}

const CheckoutForm = ({ setAddress, setOrderType }) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { user } = useSelector((state) => {
        const user = state?.auth?.user || {};
        return { user }
    });

    const [isEdit, setIsEdit] = useState(null)
    const {
        handleSubmit,
        formState: { errors },
        register,
        setValue,
        watch,
        reset,
    } = useForm({
        resolver: yupResolver(addressesValidationSchema),
        defaultValues: initialValues,
        mode: "all",
        reValidateMode: "onChange",
    });

    const resetField = () => {
        if (isEdit) setIsEdit(null)
        setValue('name', '');
        setValue('mobile_number', '');
        setValue('pin_code', '');
        setValue('address', '');
        setValue('locality', '');
        setValue('country', '');
        setValue('state', '');
        setValue('city', '');
        setValue('address_type', 'home');
        setValue('payments_method', 'card');
    }


    const { mutate: mutateAddAddresses, isPending: isPendingAddAddresses } = useMutation({
        mutationFn: isEdit ? editAddress : addAddress,
        onSuccess: (data) => {
            resetField();
            showSuccessToast(data?.data?.message);
            queryClient.invalidateQueries("fetchAddresses");
        }
    })


    const handleSubmitForm = (values) => {
        if (!user?.access_token) {
            showErrorToast('Please login to add address')
            navigate('/sign-in', { state: { redirect: '/cart' } });
            return;
        }
        const payload = { ...values, user_id: user?._id }
        if (isEdit) {
            payload._id = isEdit
        }
        mutateAddAddresses(payload)
    }


    useEffect(() => setOrderType(watch('payments_method')), [watch('payments_method')])

    return (
        <form className='bg-white' onSubmit={handleSubmit(handleSubmitForm)}>
            {isPendingAddAddresses && <FullScreenLoader />}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
                    {!user?.access_token && (
                        <div class="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            Please login to Add Address
                        </div>
                    )}
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <TextInput
                                {...register('name')}
                                {...{
                                    label: "Name",
                                    placeholder: "Enter name",
                                    error: errors?.name?.message
                                }}
                            />
                        </div>
                        <div className="sm:col-span-3">
                            <TextInput
                                {...register('mobile_number')}
                                {...{
                                    label: "Mobile Number",
                                    placeholder: "Enter mobile number",
                                    error: errors?.mobile_number?.message,
                                    type: 'number'
                                }}
                            />
                        </div>

                        <div className="sm:col-span-3">
                            <TextInput
                                {...register('pin_code')}
                                {...{
                                    label: "Pin Code",
                                    placeholder: "Enter pin code",
                                    error: errors?.pin_code?.message,
                                    type: 'number'
                                }}
                            />
                        </div>
                        <div className="sm:col-span-3">
                            <TextInput
                                {...register('address')}
                                {...{
                                    label: "Address",
                                    placeholder: "Address(House No, Building, Street, Area)",
                                    error: errors?.address?.message,
                                }}
                            />
                        </div>
                        <div className="sm:col-span-3">
                            <TextInput
                                {...register('locality')}
                                {...{
                                    label: "Locality/Town",
                                    placeholder: "Enter locality or town",
                                    error: errors?.locality?.message,
                                }}
                            />
                        </div>

                        <div className="sm:col-span-3">
                            <div className="mt-2">
                                <SelectInput
                                    {...register('country')}
                                    {...{
                                        label: "Country",
                                        error: errors?.country?.message,
                                        selectName: 'name',
                                        selectValue: 'isoCode',
                                        options: [...Country.getAllCountries()],
                                    }}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <div className="mt-2">
                                <SelectInput
                                    {...register('state')}
                                    {...{
                                        label: "State",
                                        error: errors?.state?.message,
                                        selectName: 'name',
                                        selectValue: 'isoCode',
                                        options: [...State.getStatesOfCountry(watch('country'))],
                                    }}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <div className="mt-2">
                                <SelectInput
                                    {...register('city')}
                                    {...{
                                        label: "City",
                                        error: errors?.city?.message,
                                        selectName: 'name',
                                        selectValue: 'id',
                                        options: [...City.getCitiesOfState(watch('country'), watch('state'))],
                                    }}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <div className="mt-10 space-y-10">
                                <fieldset>
                                    <legend className="text-sm font-semibold leading-6 text-gray-900">Save Address As</legend>
                                    <div className=" flex  items-center mt-4 gap-6">
                                        <div className="flex items-center gap-3">
                                            <input
                                                {...register('address_type')}
                                                value="home"
                                                id="home"
                                                name="address_type"
                                                type="radio"
                                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                            <label htmlFor="home" className="block text-sm font-medium leading-6 text-gray-900">
                                                Home
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <input
                                                {...register('address_type')}
                                                value="work"
                                                id="work"
                                                name="address_type"
                                                type="radio"
                                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                            <label htmlFor="work" className="block text-sm font-medium leading-6 text-gray-900">
                                                Work
                                            </label>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>



                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            onClick={resetField}
                            type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Reset
                        </button>
                        <button
                            disabled={!user?.access_token}
                            type="submit"
                            className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${user?.access_token
                                ? "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
                                : "bg-gray-500 cursor-not-allowed"
                                }`}
                        >
                            {isEdit ? "Edit Address" : "Add Address"}
                        </button>
                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <AddressList {...{ setValue, setAddress, reset, setIsEdit }} />
                    <div className="mt-10 space-y-10">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Methods</legend>
                            <p className="mt-1 text-sm leading-6 text-gray-600">Choose Payment Mode</p>
                            <div className="mt-6 space-y-6">
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="cash"
                                        name="payments_method"
                                        type="radio"
                                        value="cash"
                                        {...register('payments_method')}
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                                        Cash
                                    </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="card"
                                        name="payments_method"
                                        type="radio"
                                        value="card"
                                        {...register('payments_method')}
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                                        Card Payment
                                    </label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default CheckoutForm;
