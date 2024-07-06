import { config } from '../_helpers/config.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import sendEmail from '../_helpers/send-email.js'
import {isValidId} from '../_helpers/db.js'
import Role from '../_helpers/role.js'
import User from '../models/user.model.js'
import RefreshToken from '../models/refresh-token.model.js'

function generateJwtToken (user) {
    // create a jwt token containing the User id that expires in 60 minutes
    return jwt.sign({ sub: user.id, id: user.id }, config.secret, { expiresIn: '60m' })
}

function generateRefreshToken (user, ipAddress) {
    // create a refresh token that expires in 7 days
    return new RefreshToken({
        user: user.id,
        token: randomTokenString(),
        expires: new Date(Date.now() + 7*24*60*60*1000),
        createdByIp: ipAddress
    })
}
   
function randomTokenString() {
    return crypto.randomBytes(40).toString('hex')
}


function basicDetails(user){
    const { id, title, username, firstName, lastName, email, role, created, updated, isVerified, image } = user
    return { id, title, username, firstName, lastName, email, role, created, updated, isVerified, image }
}

async function getUser(id){
    if (!isValidId(id)) throw 'User not found'
    const user = await User.findById(id)
    if (!user) throw 'User not found'
    return user;
}

async function getRefreshToken (token) {
    const refreshToken = await RefreshToken.findOne({ token }).populate('user')
    if (!refreshToken || !refreshToken.isActive) throw 'Invalid token'
    return refreshToken
}

function hash(password){
    return bcrypt.hashSync(password, 10)
}


async function sendVerificationEmail(user, origin) {
    let message;
    if (origin) {
        const verifyUrl = `${origin}/account/verify-email?token=${user.verificationToken}`;
        message = `<p>Please click the below link to verify your email address:</p>
                   <p><a href="${verifyUrl}">${verifyUrl}</a></p>`;
    } else {
        message = `<p>Please use the below token to verify your email address with the <code>/User/verify-email</code> api route:</p>
                   <p><code>${user.verificationToken}</code></p>`;
    }

    await sendEmail({
        to: user.email,
        subject: 'MegaLearn - Verify Email',
        html: `<h4>Verify Email</h4>
               <p>Thanks for registering!</p>
               ${message}`
    });
}

async function sendAlreadyRegisteredEmail(email, origin){
    let message;
    if (origin) {
        message = `<p>If you don't know your password please visit the <a href="${origin}/account/forgot-password">forgot password</a> page.</p>`;
    } else {
        message = `<p>If you don't know your password you can reset it via the <code>/account/forgot-password</code> api route.</p>`;
    }

    await sendEmail({
        to: email,
        subject: 'MegaLearn - Email Already Registered',
        html: `<h4>Email Already Registered</h4>
               <p>Your email <strong>${email}</strong> is already registered.</p>
               ${message}`
    });
}

async function sendPasswordResetEmail(user, origin){
    let message;
    if (origin) {
        const resetUrl = `${origin}/account/reset-password?token=${user.resetToken.token}`;
        message = `<p>Please click the below link to reset your password, the link will be valid for 1 day:</p>
                   <p><a href="${resetUrl}">${resetUrl}</a></p>`;
    } else {
        message = `<p>Please use the below token to reset your password with the <code>/account/reset-password</code> api route:</p>
                   <p><code>${user.resetToken.token}</code></p>`;
    }

    await sendEmail({
        to: user.email,
        subject: 'MegaLearn - Reset Password',
        html: `<h4>Reset Password Email</h4>
               ${message}`
    });
}


const UserService = {
    authenticate: async ({ email, password, ipAddress }) => {
        const user = await User.findOne({ email });
    
        if (!user || !user.isVerified || !bcrypt.compareSync(password, user.passwordHash)) {
            throw 'Email or password is incorrect';
        }
    
        // authentication successful so generate jwt and refresh tokens
        const jwtToken = generateJwtToken(user);
        const refreshToken = generateRefreshToken(user, ipAddress);
    
        // save refresh token
        await refreshToken.save();
    
        // return basic details and tokens
        return {
            ...basicDetails(user),
            jwtToken,
            refreshToken: refreshToken.token
        };
    },
    
    refreshToken: async ({ token, ipAddress }) => {
        const refreshToken = await getRefreshToken(token);
        const { user } = refreshToken;
    
        // replace old refresh token with a new one and save
        const newRefreshToken = generateRefreshToken(user, ipAddress);
        refreshToken.revoked = Date.now();
        refreshToken.revokedByIp = ipAddress;
        refreshToken.replacedByToken = newRefreshToken.token;
        await refreshToken.save();
        await newRefreshToken.save();
    
        // generate new jwt
        const jwtToken = generateJwtToken(user);
    
        // return basic details and tokens
        return {
            ...basicDetails(user),
            jwtToken,
            refreshToken: newRefreshToken.token
        };
    },
    
    revokeToken : async ({ token, ipAddress }) => {
        const refreshToken = await getRefreshToken(token);
    
        // revoke token and save
        refreshToken.revoked = Date.now();
        refreshToken.revokedByIp = ipAddress;
        await refreshToken.save();
    },
    
    register : async (params, origin) => {
        // validate
        if (await User.findOne({ email: params.email })) {
            // send already registered error in email to prevent User enumeration
            return await sendAlreadyRegisteredEmail(params.email, origin);
        }
        // create User object
        const user = new User(params);
    
        // first registered User is an admin
        const isFirstUser = (await User.countDocuments({})) === 0;
        user.role = isFirstUser ? Role.Admin : Role.User;
        user.verificationToken = randomTokenString();
    
        // hash password
        user.passwordHash = hash(params.password);
    
        // save User
        await user.save();
    
        // send email
        await sendVerificationEmail(user, origin);
    },
    
    verifyEmail : async ({ token }) => {
        const user = await User.findOne({ verificationToken: token });
    
        if (!user) throw 'Verification failed';
    
        user.verified = Date.now();
        user.verificationToken = undefined;
        await user.save();
    },
    
    forgotPassword : async ({ email }, origin) => {
        const user = await User.findOne({ email });
    
        // always return ok response to prevent email enumeration
        if (!user) return;
    
        // create reset token that expires after 24 hours
        user.resetToken = {
            token: randomTokenString(),
            expires: new Date(Date.now() + 24*60*60*1000)
        };
        await user.save();
    
        // send email
        await sendPasswordResetEmail(user, origin);
    },
    
    validateResetToken : async({ token }) => {
        const user = await User.findOne({
            'resetToken.token': token,
            'resetToken.expires': { $gt: Date.now() }
        });
    
        if (!user) throw 'Invalid token';
    },
    
    resetPassword : async ({ token, password }) => {
        const user = await User.findOne({
            'resetToken.token': token,
            'resetToken.expires': { $gt: Date.now() }
        });
    
        if (!user) throw 'Invalid token';
    
        // update password and remove reset token
        user.passwordHash = hash(password);
        user.passwordReset = Date.now();
        user.resetToken = undefined;
        await user.save();
    },
    
    getAll : async () => {
        const users = await User.find();
        return users.map(x => basicDetails(x));
    },
    
    getById : async (id) => {
        const user = await getUser(id);
        return basicDetails(user);
    },
    
    create : async (params) => {
        // validate
        if (await User.findOne({ email: params.email })) {
            throw 'Email "' + params.email + '" is already registered';
        }
    
        const user = new User(params);
        user.verified = Date.now();
    
        // hash password
        user.passwordHash = hash(params.password);
    
        // save User
        await user.save();
    
        return basicDetails(user);
    },
    
    update : async (id, params) => {
        const user = await getUser(id);
    
        // validate (if email was changed)
        if (params.email && user.email !== params.email && await User.findOne({ email: params.email })) {
            throw 'Email "' + params.email + '" is already taken';
        }
    
        // hash password if it was entered
        if (params.password) {
            params.passwordHash = hash(params.password);
        }
    
        // copy params to User and save
        Object.assign(user, params);
        user.updated = Date.now();
        await user.save();
    
        return basicDetails(user);
    },
    
    delete : async (id) => {
        const user = await getUser(id);
        await user.deleteOne();
    }
}

export default UserService