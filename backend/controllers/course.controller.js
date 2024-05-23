import morgan from "morgan";
import Course from "../models/cours.model.js";

// Create a new course
export const createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    console.log(error);
    res.status(403).send("invalid Cours");
  }
};

// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    //TODO
    console.log(error);
    res.status(403).send({});
  }
};

// Get a single course by id
export const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id)
    .populate("creator")
    .populate("videos")
    .populate("students")
    .populate("category");
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  res.json(course);
};

// Update a course by id
export const updateCourseById = async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  res.json(course);
};

// Delete a course by id
export const deleteCourseById = async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  res.json({ message: "Course deleted" });
};
