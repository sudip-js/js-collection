
import Address from "../../modals/addressModal.js";
import { errorHandler } from "../../utils/error.js";
import { addressesValidationSchema } from "../../validations/addressValidation.js";

export const addAddress = async (req, res, next) => {
    try {
        const values = await addressesValidationSchema.validate(req.body, { abortEarly: false });
        const { user_id, name, mobile_number, pin_code, address, locality, country, state, city, address_type,
        } = values;
        const newAddress = new Address({
            name, mobile_number, pin_code, address, locality, country, state, city, address_type, user_id
        });
        await newAddress.save();
        return res.status(200).json({
            success: true,
            message: "Address added successfully.",
            data: newAddress,
        });
    } catch (error) {
        if (error?.name === "ValidationError") {
            return res.status(422).json({
                success: false,
                message: 'Validation Error',
                error: error?.errors
            })

        } else if (error?.code === 11000) {
            return res.status(422).json({ success: false, message: "" })
        }
        else {
            return next(errorHandler(500, "Something went wrong!."));
        }
    }
}


export const fetchAllAddresses = async (req, res, next) => {
    try {
        const addressId = req.params.id;
        const data = await Address.find({ user_id: addressId });
        res.status(200).json({ success: true, message: 'Success', data })
    } catch (error) {
        return next(errorHandler(500, "Something went wrong!."));
    }
}



export const deleteExistingAddress = async (req, res, next) => {
    try {
        const addressId = req.params.id;
        const deletedAddress = await Address.findByIdAndDelete(addressId);
        if (!deletedAddress) {
            return res.status(404).json({ success: false, message: 'Address not found' });
        }
        res.status(200).json({ success: true, message: 'Address deleted successfully' });
    } catch (error) {
        return next(errorHandler(500, "Something went wrong!"));
    }
}



export const editExistingAddress = async (req, res, next) => {
    const addressId = req.params.id;
    const { name, mobile_number, pin_code, address, locality, country, state, city, address_type,
    } = req.body;

    try {
        const updatedAddress = await Address.findByIdAndUpdate(addressId, {
            name, mobile_number, pin_code, address, locality, country, state, city, address_type,
        }, {
            new: true,
            runValidators: true,
        });
        if (!updatedAddress) {
            return res.status(404).json({ success: false, message: 'Address not found' });
        }
        res.status(200).json({ success: true, message: 'Address updated successfully', data: updatedAddress });
    } catch (error) {
        return next(errorHandler(500, "Something went wrong!"));
    }
}






