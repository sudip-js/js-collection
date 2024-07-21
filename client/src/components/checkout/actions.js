import { apiClient } from '../../services/apis';
import { ROUTES } from './routes';

export const fetchAddresses = ({ id }) => {
    return apiClient({
        method: ROUTES.FETCH_ADDRESSES.METHOD,
        url: `${ROUTES.FETCH_ADDRESSES.URL}/${id}`,
    });
};

export const addAddress = (data) => {
    return apiClient({
        method: ROUTES.ADD_ADDRESS.METHOD,
        url: ROUTES.ADD_ADDRESS.URL,
        data
    });
};
export const editAddress = (data) => {
    return apiClient({
        method: ROUTES.EDIT_ADDRESS.METHOD,
        url: `${ROUTES.EDIT_ADDRESS.URL}/${data?._id}`,
        data
    });
};
