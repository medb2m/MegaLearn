import Course from '../models/course.model.js';

const checkEnrollment = async (req, res, next) => {
    try {
        const courseId = req.params.courseId
        const userId = req.user.id;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const isEnrolled = course.enrolls.includes(userId);
        if (!isEnrolled) {
            return res.status(403).json({ message: 'User not enrolled in this course' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export default checkEnrollment;
