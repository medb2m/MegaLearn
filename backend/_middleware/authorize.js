import jwt from "express-jwt";
import { config } from "../_helpers/config.js";
import User from "../models/user.model.js";
import RefreshToken from "../models/refresh-token.model.js";


const { secret } = config



export default function authorize(roles = []) {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        // authenticate JWT token and attach user to request object (req.user)
        jwt({ secret, algorithms: ['HS256'] }),

    // authorize based on user role
    async (req, res, next) => {
      const user = await User.findById(req.user.id);
      const refreshTokens = await RefreshToken.find({ user: user.id });

      if (!user || (roles.length && !roles.includes(user.role))) {
        // User no longer exists or role not authorized
        return res.status(401).json({ message: "Unauthorized" });
      }

            // authentication and authorization successful
            req.user = user
            req.user.ownsToken = token => !!refreshTokens.find(x => x.token === token);
            next();
        }
    ];
}
