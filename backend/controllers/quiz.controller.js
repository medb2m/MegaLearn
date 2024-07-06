import Quiz from '../models/quiz.model.js';
import { generateCertificate } from '../_helpers/certificateGenerator.js';
import Certificate from '../models/certificate.model.js';
import Course from '../models/course.model.js';

import { OpenAI } from 'openai';
import { VertexAI } from '@google-cloud/vertexai';


const nbAnswers = 5;
const nbQuestions = 10;

// Create a new quiz
export const createQuiz = async (req, res) => {
  try {

    const topic = req.body?.title;

    const quizAI = await generateQuizContent(nbQuestions, nbAnswers, topic)
    /* generateQuiz(topic).then((quiz) => {
      console.log("Formatted Quiz:");
      console.log(formatQuiz(quiz));
    }); */

    console.log(quizAI.candidates[0]?.content?.parts[0]?.text);
      //?.text);

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
   
    //Object.assign(quiz, req.body);
    quiz.title = req.body?.title;
    quiz.questions = req.body?.questions;
    
    await quiz.save();
    res.status(200).json(quiz);
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

    for (let i = 0 ; i < quiz?.questions?.length ; i++) {
      const userAnswer = answers[i];
      const correctOption = quiz?.questions[i]?.options?.find(option => option?.isCorrect && option?.optionText == userAnswer);
      if (correctOption) {
        score += 1;
      }
    }

    console.log('score' + score )

    const percentage = (score / quiz?.questions?.length) * 100;

    const course = await Course.findById(courseId);
    if (percentage >= 65) {
      const userName = req.user.firstName +"_"+ req.user.lastName
      console.log('username here ' + userName )
      console.log('title here '+quiz.title)
      const certificate = await generateCertificate(userId, courseId, quiz._id, percentage, course.title, req);
      
      return res.status(200).json({
        message: `Quiz passed, certificate generated you can find at http://localhost:4000/pdfs/${userName}_certificate.pdf`,
        certificate: certificate,
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


// GOOGLE VERTEX AI API APPROACH

function initialize_vertex() {
  // Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({project: 'applied-range-428600-v9', location: 'us-central1'});
const model = 'gemini-1.5-flash-001';

// Instantiate the models
const generativeModel = vertex_ai.preview.getGenerativeModel({
  model: model,
  generationConfig: {
    'maxOutputTokens': 8192,
    'temperature': 1,
    'topP': 0.95,
  },
  safetySettings: [
    {
        'category': 'HARM_CATEGORY_HATE_SPEECH',
        'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
        'category': 'HARM_CATEGORY_DANGEROUS_CONTENT',
        'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
        'category': 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
        'category': 'HARM_CATEGORY_HARASSMENT',
        'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
    }
  ],
});
return generativeModel;
}

function formatQuizResponse(text) {
  const questions = text?.strip("` \n");
  let formattedQuiz = "";
  questions?.forEach((question, index) => {
    formattedQuiz += `Q${index + 1}: ${question.trim()}\n\n`;
  });
  return formattedQuiz;
}

async function generateQuizContent(numQuestions, numAnswers, topic) {
  const generativeModel = initialize_vertex();
  const req = {
    contents: [
        { role: 'user', 
          parts: [
          { text: `Generate a quiz in french with ${numQuestions} questions on the topic ${topic}. 
            Each question should have ${numAnswers} answer choices and one correct answer indicated.

           input: Quiz de programmation Python
           output: { \"questions\": [
                      {
                        \"questionText\": \"Qu\'est-ce que Python ?\",
                        \"options\": [
                          {
                            \"optionText\": \"Un langage de programmation\",
                            \"isCorrect\": true
                          },
                          {
                            \"optionText\": \"Un système d\'exploitation\",
                            \"isCorrect\": false
                          },
                          {
                            \"optionText\": \"Un navigateur Web\",
                            \"isCorrect\": false
                          },
                          {
                            \"optionText\": \"Un moteur de recherche\",
                            \"isCorrect\": false
                          }
                       ]
                      }
                    ]
                  }
           `
          }
        ]}
    ]
  };
try {
  const streamingResp = await generativeModel.generateContentStream(req);

  /* for await (const item of streamingResp.stream) {
    process.stdout.write('stream chunk: ' + JSON.stringify(item) + '\n');
  } */

  return await streamingResp.response;
  /* ) */
}
catch (error) {
  console.log(error);
}
  
}



// OPEN AI APPROACH

async function generateQuiz(topic, numQuestions = 5) {
  // Set up OpenAI configuration
  // removed Open AI API key for Github Security concerns (key is stored locally)
  const openai = new OpenAI({apiKey: ''});
  const prompt = `Generate a quiz with ${numQuestions} questions on the topic '${topic}'. Each question should have 4 answer choices and one correct answer indicated.`;
  
  try {
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: prompt,
      max_tokens: 500,
    });

    return response?.choices[0]?.text?.trim();
  } catch (error) {
    console.error("Error generating quiz:", error);
  }

}

function formatQuiz(quizText) {
  const questions = quizText?.split("\n\n");
  let formattedQuiz = "";
  questions?.forEach((question, index) => {
    formattedQuiz += `Q${index + 1}: ${question.trim()}\n\n`;
  });
  return formattedQuiz;
}