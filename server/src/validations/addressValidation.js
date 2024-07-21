import * as yup from "yup";

export const addressesValidationSchema = yup.object({
    name: yup.string().required("Name field is required"),
    mobile_number: yup.string().required("Mobile number field is required"),
    pin_code: yup.string().required("Pin code field is required"),
    address: yup.string().required("Address field is required"),
    locality: yup.string().required("Locality field is required"),
    country: yup.string().required("Country field is required"),
    state: yup.string().required("State field is required"),
    city: yup.string().required("City field is required"),
    address_type: yup.string().required("Address type field is required"),
});