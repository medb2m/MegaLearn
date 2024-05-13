import db from '../models/users/index.js';

const ROLES = db.ROLES

const User = db.User


export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Vérification du nom d'utilisateur
    const existingUsername = await User.findOne({ username: req.body.username });
    if (existingUsername) {
      return res.status(400).json({ message: "Failed! Username is already in use!" });
    }

    // Vérification de l'email
    const existingEmail = await User.findOne({ email: req.body.email });
    if (existingEmail) {
      return res.status(400).json({ message: "Failed! Email is already in use!" });
    }

    // Si le nom d'utilisateur et l'email ne sont pas déjà utilisés, passez à la prochaine étape
    next();
  } catch (error) {
    console.error("Erreur lors de la vérification du nom d'utilisateur ou de l'email :", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({ message: `Failed! Role ${req.body.roles[i]} does not exist!` });
      }
    }
  }

  next();
};
