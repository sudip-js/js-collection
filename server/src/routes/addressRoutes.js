import express from "express";
import { addAddress, deleteExistingAddress, editExistingAddress, fetchAllAddresses } from "../controllers/address/addressController.js"

const router = express.Router();

router.get('/:id', fetchAllAddresses);
router.post('/', addAddress);
router.delete('/:id', deleteExistingAddress);
router.put('/:id', editExistingAddress);

export default router;




