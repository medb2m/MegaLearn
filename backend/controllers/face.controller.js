/* import {faceService} from './face.service.js';
import User from '../models/user.model.js'; 

export async function faceAuthenticate(req, res, next) {
    const { imageUrl, userId } = req.body;

    if (!imageUrl || !userId) {
        return res.status(400).json({ message: 'Image URL and User ID are required.' });
    }

    try {
        const detectedFaces = await faceService.detectFace(imageUrl);
        if (!detectedFaces.length) {
            return res.status(400).json({ message: 'No faces detected in the provided image.' });
        }
        const detectedFaceId = detectedFaces[0].faceId;

        const user = await User.findById(userId);
        if (!user || !user.image) {
            return res.status(404).json({ message: 'User not found or no face image stored.' });
        }

        const storedFaces = await faceService.detectFace(user.image);
        if (!storedFaces.length) {
            return res.status(400).json({ message: 'No faces detected in the stored face image.' });
        }
        const storedFaceId = storedFaces[0].faceId;

        const verificationResult = await faceService.verifyFace(detectedFaceId, storedFaceId);
        if (verificationResult.isIdentical) {
            return res.status(200).json({ message: 'Face authenticated successfully.' });
        } else {
            return res.status(401).json({ message: 'Face authentication failed.' });
        }
    } catch (error) {
        next(error);
    }
}
 */


import faceApi from './face.service.js'; // Importez votre module pour la détection et la vérification des visages

// Fonction pour comparer les visages
export async function compareFaces(userImage, frontEndImage) {
    try {
        // Effectuez la détection des visages pour les deux images
        const userFaceData = await faceApi.detect(userImage);
        const frontEndFaceData = await faceApi.detect(frontEndImage);

        // Si une seule face est détectée dans chaque image, comparez-les
        if (userFaceData.length === 1 && frontEndFaceData.length === 1) {
            const similarity = await faceApi.verify(userFaceData[0].faceId, frontEndFaceData[0].faceId);
            return similarity;
        } else {
            // Si aucune ou plusieurs faces sont détectées, retournez un message d'erreur
            return { error: 'Invalid number of faces detected' };
        }
    } catch (error) {
        console.error('Error comparing faces:', error);
        throw error;
    }
}
