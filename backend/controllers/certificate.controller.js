import Certificate from '../models/certificate.model.js';
import Course from '../models/course.model.js';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


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

    res.status(200).json(certificate);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving certificate', error: error.message });
  }
};

// Get all certificates
export const getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find().populate('user').populate('course');
    res.status(200).json(certificates);
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
    res.status(200).json(certificates);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving certificates', error: error.message });
  }
};

export const getAllCertificateByUserId = async (req, res) => {
  try {
    const certificates = await Certificate.find({user : req.user.id}).populate('user').populate('course')
    res.status(200).json(certificates)
  } catch (error){
    res.status(500).json({ message: 'Error fetching certificates', error: error.message });
  }
}


export const  deleteOnce = async (req, res) =>{
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id)
    if (!certificate) {
    return res.status(404).json({ message: 'certificate not found' })
  }
  res.status(203).json({ message: 'certificate deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Error while deleting certificate', error: error.message });
  }
}


export const downloadCertificate = async (req, res) =>{
  try{
    const certificate = await Certificate.findOne({certificateId : req.params.id}).populate('user')
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
  } 
  const firstName = certificate.user.firstName
  console.log('firstName : ' + firstName)
  const location = path.join(__dirname, '..', 'public', 'pdf', `${firstName}_certificate.pdf`)
  res.download(location, (err) =>{
    if (err) {
      return res.status(500).json({ message: 'Error downloading certificate', error: err.message });
    }
  })
  }catch (error) {
    res.status(500).json({ message: 'Error while downloading certificate', error: error.message });
  }
}