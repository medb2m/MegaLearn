import express from 'express';
import { getCertificateById, getAllCertificates, getCertificatesByCourse, deleteOnce } from '../controllers/certificate.controller.js';
import authorize from '../_middleware/authorize.js';
import Role from '../_helpers/role.js';

const router = express.Router();

router.get('/:id', authorize(), getCertificateById);
router.get('/', authorize(/* Role.Admin */), getAllCertificates);
router.get('/course/:courseId', authorize(), getCertificatesByCourse);
router.delete('/:id', deleteOnce)

export default router;