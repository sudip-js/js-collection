import { apiClient } from "../../services/apis";
import { ROUTES } from "./routes";

export const deleteExistingAddress = ({ id }) => {
    return apiClient({
        method: ROUTES.DELETE_EXISTING_ADDRESS.METHOD,
        url: `${ROUTES.DELETE_EXISTING_ADDRESS.URL}/${id}`,
    });
};