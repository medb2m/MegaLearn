import Category from "../models/categorie.model.js";

// Create a new category
export const CreateCategory = async (req, res) => {
  const { name, courses } = req.body;
  const newCategory = new Category({ name, courses });
  try {
    await newCategory.save();
    res.send(newCategory);
  } catch (error) {
    console.log(error);
    res.status(403).send("invalid category");
    //TODO
    //best practice is to log error using morgan
    //res.status(403).send({ error, message: "invalid category" });
  }
};

// Get all categories
export const getAllCategories = async (req, res) => {
  const categories = await Category.find().populate("courses");
  res.json(categories);
};

// Get a single category by id
export const getCategoryById = async (req, res) => {
  const category = await Category.findById(req.params.id).populate("courses");
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.json(category);
};

// Update a category by id
export const updateCategoryById = async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.json(category);
};

// Delete a category by id
export const deleteCategoryById = async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.json({ message: "Category deleted" });
};
