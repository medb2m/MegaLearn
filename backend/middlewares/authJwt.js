import jwt from "jsonwebtoken";
import { secret } from "../config/auth.config.js";
import db from '../models/users/index.js';

const { user: User, role: Role } = db;

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.session.token;

    if (!token) {
      return res.status(403).json({ message: "No token provided!" });
    }

    const decoded = jwt.verify(token, secret);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

const checkUserRole = async (req, res, next, roleName) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === roleName) {
        return next();
      }
    }

    return res.status(403).json({ message: `Require ${roleName} Role!` });
  } catch (error) {
    console.error("Error while checking user role:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const isAdmin = async (req, res, next) => {
  await checkUserRole(req, res, next, "admin");
};

export const isModerator = async (req, res, next) => {
  await checkUserRole(req, res, next, "moderator");
};

export const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
};
