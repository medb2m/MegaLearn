/* import axios from 'axios';
import { config } from '../_helpers/config.js';

const { key, endpoint } = config;

export const faceService = {
    detectFace,
    verifyFace
};

async function detectFace(imageUrl) {
    const url = `${endpoint}/face/v1.0/detect`;
    const params = {
        returnFaceId: true,
        returnFaceAttributes: 'age,gender,smile,facialHair,glasses,emotion,makeup,hair'
    };

    const headers = {
        'Ocp-Apim-Subscription-Key': key,
        'Content-Type': 'application/json'
    };
    const body = { url : imageUrl}

    const response = await axios.post(url, body, { params, headers });
    return response.data;
}

async function verifyFace(faceId1,faceId2) {
    const url = `${endpoint}/face/v1.0/verify`
    const headers = {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': key,
    };
    const body = {
        faceId1,
        faceId2,
    };

    const response = await axios.post(url, body, { headers });
    return response.data;
} */
import axios from 'axios';
import { config } from '../_helpers/config.js';

const faceApi = axios.create({
    baseURL: config.FACE_API_HOST,
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': config.FACE_API_KEY
    }
});

export default {
    async detect(image) {
        try {
            const response = await faceApi.post(config.FACE_API_PATH_DETECT, {
                data: image,
                returnFaceId: true
            });
            return response.data;
        } catch (error) {
            console.error('Error detecting face:', error);
            throw error;
        }
    },

    async verify(faceId1, faceId2) {
        try {
            const response = await faceApi.post(config.FACE_API_PATH_VERIFY, {
                faceId1: faceId1,
                faceId2: faceId2
            });
            return response.data;
        } catch (error) {
            console.error('Error verifying face:', error);
            throw error;
        }
    }
};
