import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { authConfig } from "../config/auth.config.js";
import db from '../models/users/index.js';

const { user: User, role: Role, refreshToken: RefreshToken } = db;

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
// after refresh token 
export const signin = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }).populate("roles", "-__v");

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ accessToken: null, message: "Invalid Password!" });
    }

    const token = jwt.sign({ id: user.id }, authConfig.secret, { expiresIn: authConfig.jwtExpiration });
    const refreshToken = await RefreshToken.createToken(user);

    const authorities = user.roles.map((role) => "ROLE_" + role.name.toUpperCase());

    return res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
      refreshToken: refreshToken,
    });
  } catch (error) {
    console.error("Error during user sign-in:", error);
    return res.status(500).send({ message: "Internal server error." });
  }
};



//before refresh token 
/* export const signin = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }).populate("roles", "-__v");

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
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
}; */

export const refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  try {
    let refreshToken = await RefreshToken.findOne({ token: requestToken });

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();
      
      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }

    let newAccessToken = jwt.sign({ id: refreshToken.user._id }, authConfig.secret, {
      expiresIn: authConfig.jwtExpiration,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
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
