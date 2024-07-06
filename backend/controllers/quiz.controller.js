import Quiz from '../models/quiz.model.js';
import { generateCertificate } from '../_helpers/certificateGenerator.js';
import Certificate from '../models/certificate.model.js';
import Course from '../models/course.model.js';

// Create a new quiz
export const createQuiz = async (req, res) => {
  try {
    const quiz = new Quiz({
     ...req.body,
      course : req.params.id,
      creator: req.user.id
    });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Error creating quiz', error: error.message });
  }
}

export const getQuizbyCourseID = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({course : req.params.courseId}).populate('questions')
    res.json(quiz)
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving Quiz', error: error.message });
  }
}

// Get all quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('course').populate('creator');
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving quizzes' });
  }
};

// Get a single quiz by id
export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('course').populate('creator');
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving quiz' });
  }
};

// Update a quiz by id
export const updateQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Vérifier si l'utilisateur est le créateur du quiz
    if (quiz.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: 'User not authorized to update this quiz' });
    }

    Object.assign(quiz, req.body);
    await quiz.save();

    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Error updating quiz', error: error.message });
  }
};

// Delete a quiz by id
export const deleteQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Vérifier si l'utilisateur est le créateur du quiz
    if (quiz.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: 'User not authorized to delete this quiz' });
    }

    await quiz.deleteOne();

    res.json({ message: 'Quiz deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting quiz', error: error.message });
  }
};



// pass quiz
export const takeQuiz = async (req, res) => {
  try {
    const courseId = req.params.courseId
    const userId = req.user.id
    const { answers } = req.body

    // Check if the user has already passed the quiz for this course
    /* const existingCertificate = await Certificate.findOne({ user: userId, course: courseId });
    if (existingCertificate) {
      return res.status(400).json({ message: 'You have already passed the quiz for this course' });
    } */

    const quiz = await Quiz.findOne({ course: courseId });
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found for this course' });
    }

    let score = 0;

    quiz.questions.forEach((question, index) => {
      const userAnswer = answers[index];
      const correctOption = question.options.find(option => option.isCorrect && option.optionText === userAnswer);
      if (correctOption) {
        score += 1;
      }
    });

    const percentage = (score / quiz.questions.length) * 100;

    const course = await Course.findById(courseId)
    if (percentage >= 65) {
      const userName = req.user.firstName +"_"+ req.user.lastName
      console.log('username here ' + userName )
      console.log('title here '+quiz.title)
      const certificate = await generateCertificate(userId, courseId, quiz._id, percentage, course.title, req);
      
      return res.status(200).json({
        message: `Quiz passed, certificate generated you can find at http://localhost:4000/pdf/${userName}_certificate.pdf`,
        percentage
      })
    } else { 

      return res.status(200).json({
        message: 'Quiz completed, but score is score isn\'t enough'
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error taking quiz', error: error.message });
  }
};
