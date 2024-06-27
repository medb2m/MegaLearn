import express from 'express';
import { createQuiz, getAllQuizzes, getQuizById, updateQuizById, deleteQuizById, takeQuiz, getQuizbyCourseID} from '../controllers/quiz.controller.js';
import authorize from '../_middleware/authorize.js';
import Role from '../_helpers/role.js';
// import checkEnrollment from '../_middleware/checkEnrollement.js';

const router = express.Router();

<<<<<<< Updated upstream
router.post('/add/:courseId', authorize(), createQuiz);
router.get('/', authorize(/* Role.Admin */),getAllQuizzes);
router.get('/:quizId', authorize(), getQuizById);
router.get('/course/:courseId', authorize(), getQuizbyCourseID);
router.put('/:quizId', authorize(Role.User), updateQuizById);
router.delete('/:id', authorize(Role.User), deleteQuizById);
=======
router.post('/:id', authorize(), createQuiz);
router.get('/', getAllQuizzes);
router.get('/:id', authorize(), getQuizById);
router.get('/course/:courseId', getQuizbyCourseID);
router.put('/:id', updateQuizById);
router.delete('/:id', authorize(), deleteQuizById);
>>>>>>> Stashed changes
router.post('/take/:courseId', authorize(), checkEnrollment, takeQuiz);

export default router;
