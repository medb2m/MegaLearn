import Course from "../models/course.model.js";
import User from "../models/user.model.js";

// Create a new course
export const createCourse = async (req, res) => {
  try {
    const { title, description, price, category, duration, sections } =
      req.body;
    const creatorId = req.user._id;

    const coursedata = {
      title,
      description,
      price,
      category,
      duration,
      sections: JSON.parse(sections),
      creator: creatorId
    };

    if (req.file) {
      coursedata.image = `${req.protocol}://${req.get("host")}/img/${
        req.file.filename
      }`;
    }

    const course = new Course(coursedata);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const enrollUserToCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.id;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (course.enrolls.includes(userId)) {
      return res.status(400).json({ message: "User already enrolled in this course" });
    }

    course.enrolls.push(userId);

    user.enrolls.push(courseId);

    // Save
    await course.save();
    await user.save();

    res.json({ message: "User enrolled in course successfully", course, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getEnrolledCoursesByUser = async (req, res) => {
  try {
    const userId = req.user._id;

    // Récupérer l'utilisateur et ses cours inscrits
    const user = await User.findById(userId)
      .populate({
        path: "enrolls",
        populate: {
          path: "creator",
          select: "firstName lastName",
        },
      })
      .populate({
        path: "enrolls",
        populate: {
          path: "category",
          select: "name",
        },
      });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.enrolls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all courses
export const getAllCourses = async (req, res) => {
  const courses = await Course.find().populate("creator").populate("sections");
  res.json(courses);
};

// Get a single course by id
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("creator")
      .populate("sections")
      .populate("category");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting one course", error: error.message });
  }
};

// Update a course by id
export const updateCourseById = async (req, res) => {
  try {
    const { title, description, price, category, duration, sections } =
      req.body;

    const coursedata = {
      title,
      description,
      price,
      category,
      duration,
      sections: JSON.parse(sections),
    };

    if (req.file) {
      coursedata.image = `${req.protocol}://${req.get("host")}/img/${
        req.file.filename
      }`;
    }

    const course = await Course.findByIdAndUpdate(req.params.id, coursedata, {
      new: true,
    });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Updating course", error: error.message });
  }
};

// Delete a course by id
export const deleteCourseById = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Deleting course", error: error.message });
  }
};

export const enrollInCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.id;

    // Vérifiez si le cours existe
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Vérifiez si l'utilisateur est déjà inscrit
    if (course.enrolls.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User already enrolled in this course" });
    }

    console.log("222")
    course.enrolls.push(userId);
    await course.save();

    res.status(200).json({ message: "User enrolled in course successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error enrolling in course", error: error.message });
  }
};

