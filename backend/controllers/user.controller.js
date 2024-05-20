import Joi from 'joi';
import validateRequest from '../_middleware/validate-request.js'
import UserService from './user.service.js'
import Role from '../_helpers/role.js';


export function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

