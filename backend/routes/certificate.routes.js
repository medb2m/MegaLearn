import express from 'express';
import { getCertificateById, getCertificatesByCourse, deleteOnce, downloadCertificate, getAllCertificateByUserId } from '../controllers/certificate.controller.js';
import authorize from '../_middleware/authorize.js';
import Role from '../_helpers/role.js';

const router = express.Router();

router.get('/:id', authorize(), getCertificateById);
router.get('/',  authorize(), getAllCertificateByUserId);
router.get('/course/:courseId', authorize(), getCertificatesByCourse);
router.delete('/:id', authorize(),deleteOnce)
router.get('/download/:id', authorize(),downloadCertificate)


export default router;