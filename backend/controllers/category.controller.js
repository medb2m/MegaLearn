import Category from '../models/category.model.js'
import Course from '../models/course.model.js';

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Vérifier si une catégorie avec le même nom existe déjà
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({ message: 'Category with this name already exists' });
    }

    // Créer une nouvelle catégorie
    const category = new Category({ name });

    await category.save();

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all categories
export const getAllCategories = async (req, res) => {
  const categories = await Category.find().populate('name').populate('courses')
  res.json(categories)
};

// Get a single category by id
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate('courses')
  if (!category) {
    return res.status(404).json({ message: 'Category not found' })
  }
  res.json(category);
  }catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a category by id
export const updateCategoryById = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete a category by id
export const deleteCategoryById = async (req, res) => {
  try{
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }
    res.json({ message: 'Category deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Associate a course with a category
export const associateCourseWithCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Associate the course with the category
    category.courses.push(course);
    await category.save();

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a course from a category
export const deleteCourseFromCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    category.courses.pop(course._id);
    await category.save();

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};