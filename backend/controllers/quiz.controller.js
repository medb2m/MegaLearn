import Quiz from '../models/quiz.model.js';
import { generateCertificate } from '../_helpers/certificateGenerator.js';
import Certificate from '../models/certificate.model.js';
import User from '../models/user.model.js';

// Create a new quiz
export const createQuiz = async (req, res) => {
  try {
    const quiz = new Quiz({
      ...req.body,
      course: req.params.courseId,
      creator: req.user.id
    });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Error creating quiz', error: error.message });
  }
};

export const getQuizbyCourseID = async (req, res) => {
  try {
    const quiz = await Quiz.find({course : req.params.courseId}).populate('questions')
    res.json(quiz)
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving Quiz', error: error.message });
  }
}

// Get all quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('course');
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving quizzes' });
  }
}

// Get a single quiz by id
export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('course');
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
    const quiz = await Quiz.findById(req.params.id);
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
    const existingCertificate = await Certificate.findOne({ user: userId, course: courseId });
    if (existingCertificate) {
      return res.status(400).json({ message: 'You have already passed the quiz for this course' });
    }

    const quiz = await Quiz.findOne({ course: courseId });
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found for this course' });
    }

    let score = 0;

    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.answer) {
        score += 1;
      }
    });

    const percentage = (score / quiz.questions.length) * 100;

    if (percentage >= 70) {
      const userName = req.user.firstName +"_"+ req.user.lastName
      const certificate = await generateCertificate(userId, courseId, quiz._id, percentage, userName);
      
      return res.status(200).json({
        message: 'Quiz passed, certificate generated you can find at '+`http://localhost:4000/pdf/${userName}_certificate.pdf`,
        percentage,
        certificate
      });
    } else {
      return res.status(200).json({
        message: 'Quiz completed, but score is score isn\'t enough',
        percentage
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error taking quiz', error: error.message });
  }
};
