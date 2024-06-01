import express from 'express'
import authorize from '../_middleware/authorize.js'
import Role from '../_helpers/role.js'
import { uploadImage } from '../_middleware/multerConfig.js'
import { 
    createCourse, 
    getAllCourses, 
    getCourseById, 
    updateCourseById, 
    deleteCourseById, 
    enrollUserToCourse,
    getEnrolledCoursesByUser} from '../controllers/course.controller.js'

const router = express.Router()

router.post('/add', authorize(), uploadImage, createCourse)
router.get('/', getAllCourses)
router.get('/get/:id', getCourseById)
router.put('/update/:id', authorize(), uploadImage, updateCourseById)
router.delete('/delete/:id', authorize(/* Role.Admin */), deleteCourseById)
router.post('/enroll/:id', authorize(), enrollUserToCourse)
router.get('/enrolled-courses', authorize(), getEnrolledCoursesByUser)

export default router
