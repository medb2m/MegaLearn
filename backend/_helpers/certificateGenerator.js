import Certificate from '../models/certificate.model.js';
import { templateGenerator } from './templateCreator.js';
import { v4 as uuidv4 } from 'uuid';

export const generateCertificate = async (userId, courseId, quizId, score, courseTitle , req) => {
    const certificateId = uuidv4()
    await templateGenerator(req.user.firstName,req.user.lastName, courseTitle,  certificateId)
    // Save the certificate details to the database
    const certificate = new Certificate({
        user: userId,
        course: courseId,
        quiz: quizId,
        date: new Date(),
        score: score,
        certificateId: certificateId,    
        certificateLink : `${req.protocol}://${req.get('host')}/pdf/${req.user.firstName}_certificate.pdf`
        // certificateLink : `http://localhost:4000/pdf/${firstName}_certificate.pdf`
    });

  await certificate.save();
  return certificate;
}