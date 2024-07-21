import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const addressSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    mobile_number: {
        type: String,
        required: true
    },
    pin_code: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    locality: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address_type: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

addressSchema.index({ address: 1, locality: 1, city: 1, state: 1, pin_code: 1 }, { unique: true });

const Address = model('Address', addressSchema);

export default Address;
