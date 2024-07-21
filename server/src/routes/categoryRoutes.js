import express from "express";
import { addCategories, fetchCategories, fetchCategory, fetchCategoryProduct } from "../controllers/category/categoryController.js"

const router = express.Router();

router.get('/', fetchCategories);
router.post('/', addCategories);
router.post('/fetch-category', fetchCategory);
router.post('/fetch-category-product', fetchCategoryProduct);

export default router;




