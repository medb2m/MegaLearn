import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { secret } from "../config/auth.config.js";
import db from './models/users/index.js';

const { user: User, role: Role } = db;

export const signup = async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    const savedUser = await user.save();

    let roles = [];
    if (req.body.roles) {
      roles = await Role.find({ name: { $in: req.body.roles } });
    } else {
      const defaultRole = await Role.findOne({ name: "user" });
      roles.push(defaultRole);
    }

    savedUser.roles = roles.map((role) => role._id);
    await savedUser.save();

    return res.status(200).send({ message: "User was registered successfully!" });
  } catch (error) {
    console.error("Error during user registration:", error);
    return res.status(500).send({ message: "Internal server error." });
  }
};

export const signin = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }).populate("roles", "-__v");

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    const token = jwt.sign({ id: user.id }, secret, {
      algorithm: 'HS256',
      expiresIn: 86400, // 24 hours
    });

    const authorities = user.roles.map((role) => "ROLE_" + role.name.toUpperCase());

    req.session.token = token;

    return res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
    });
  } catch (error) {
    console.error("Error during user sign-in:", error);
    return res.status(500).send({ message: "Internal server error." });
  }
};

export const signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (error) {
    console.error("Error during user sign-out:", error);
    return res.status(500).send({ message: "Internal server error." });
  }
};
