import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAddresses } from "../checkout/actions";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { deleteExistingAddress } from "./actions";
import { showSuccessToast } from "../../utils/toast";
import FullScreenLoader from "../loader/FullScreen";
import { useSelector } from "react-redux";



const AddressList = ({ setValue, setAddress, reset, setIsEdit }) => {
    const { user } = useSelector(({ auth }) => auth)
    const queryClient = useQueryClient();
    const { data = [], isLoading } = useQuery({
        queryKey: ['fetchAddresses', user?._id],
        queryFn: () => fetchAddresses({ id: user?._id }),
        select: data => data?.data?.data,
        enabled:!!user?._id
    });

    const { isPending: isPendingDeleteAddress, mutate: mutateDeleteAddress } = useMutation({
        mutationFn: deleteExistingAddress,
        onSuccess: (data) => {
            queryClient.invalidateQueries("fetchAddresses");
            showSuccessToast(data?.data?.message)
        }
    });

    const handleEditAddress = (values) => {
        const { name, mobile_number, pin_code, address, locality, country, state, city, address_type, _id
        } = values;
        reset({
            name, mobile_number, pin_code, address, locality, country, state, city, address_type, payments_method: 'card'
        });
        setIsEdit(_id)
    }




    return (
        <>
            {isPendingDeleteAddress && <FullScreenLoader />}
            <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
            {data?.length > 0 && (
                <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose from existing address.
                </p>
            )}
            <ul role="list" className="divide-y divide-gray-100">
                {isLoading ? <li>Please wait...</li> : data?.length > 0 ? data.map((address, index) => (
                    <li key={index} className="flex justify-between gap-x-6 py-5 px-5">
                        <div className="flex min-w-0 gap-x-4 ">
                            <input
                                type="radio"
                                name="address"
                                value={JSON.stringify(address)}
                                onChange={(e) => {
                                    setValue('address', e?.target?.value);
                                    setAddress(e?.target?.value);
                                }}
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">{address?.name}</p>
                                <p className="text-sm font-semibold leading-6 text-gray-900">{`${address?.address}, ${address?.locality}`}</p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.pin_code}</p>
                            </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">{address.mobile_number}</p>
                            <p className="text-sm leading-6 text-gray-900">{address.city}</p>
                            <p className="text-sm font-semibold leading-6 text-gray-900">{address.address_type}</p>
                            <div className="flex items-center gap-2 my-3">
                                <button
                                    onClick={() => mutateDeleteAddress({ id: address?._id })}
                                    type="button"
                                    class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm p-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                >
                                    <MdDelete className="text-xl" />
                                </button>
                                <button
                                    onClick={() => handleEditAddress(address)}
                                    type="button"
                                    class="focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-900"
                                >
                                    <FaEdit className="text-xl" />
                                </button>
                            </div>
                        </div>

                    </li>
                )) : <li>
                    <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        No Record Found! Please add one.
                    </div>
                </li>}
            </ul>
        </>
    )
}

export default AddressList;