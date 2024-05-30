import Certificate from '../models/certificate.model.js';
import { templateGenerator } from '../assets/tmp/templateCreator.js';
import { v4 as uuidv4 } from 'uuid';

export const generateCertificate = async (userId, courseId, quizId, score, name) => {
    const certificateId = uuidv4()
    await templateGenerator(name, certificateId)
    // Save the certificate details to the database
    const certificate = new Certificate({
        user: userId,
        course: courseId,
        quiz: quizId,
        date: new Date(),
        score: score,
        certificateId: certificateId
    });

  await certificate.save();
  return certificate;
};