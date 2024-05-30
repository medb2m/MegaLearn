import Certificate from '../models/certificate.model.js';
import Course from '../models/course.model.js';
// Get a single certificate by id
export const getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({certificateId : req.params.id}).populate('user').populate('course');
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    if (req.user.role !== 'Admin' && req.user.id !== certificate.user.id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.json(certificate);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving certificate', error: error.message });
  }
};

// Get all certificates
export const getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find().populate('user').populate('course');
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving certificates', error: error.message });
  }
};


// Get all certificates for a specific course
export const getCertificatesByCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.user.id; 

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (req.user.role !== 'Admin' && course.creator.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const certificates = await Certificate.find({ course: courseId }).populate('user');
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving certificates', error: error.message });
  }
};


export function deleteOnce (req, res) {
  Certificate.findByIdAndDelete({_id : req.params.id}).then(() => {
   res.status(200).json('certif deleted :)')
   }).catch(err => {
       console.log(err)
   res.status(404).json(err)
   })
}