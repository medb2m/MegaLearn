import jwt from 'express-jwt'
import { config } from '../_helpers/config.js'
import User from '../models/user.model.js'
import RefreshToken from '../models/refresh-token.model.js'

const { secret } = config

export default function authorize(roles = []) {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        jwt({ secret, algorithms: ['HS256'] }),

        // authorize based on user role
        async (req, res, next) => {
            const user = await User.findById(req.user.id);
            const refreshTokens = await RefreshToken.find({ user: user.id });

            if (!user || (roles.length && !roles.includes(user.role))) {
                // User no longer exists or role not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // authentication and authorization successful
            req.user = user
            req.user.ownsToken = token => !!refreshTokens.find(x => x.token === token)
            next();
        }
    ];
}