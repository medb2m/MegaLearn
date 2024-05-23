import express from "express";
import {
  CreateCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} from "../controllers/categorie.controller.js";

const router = express.Router();

router.post("/", CreateCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.put("/:id", updateCategoryById);
router.delete("/:id", deleteCategoryById);

export default router;
