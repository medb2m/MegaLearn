import mongoose from 'mongoose'

const {Schema,model} = mongoose

const refreshSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    token: String,
    expires: Date,
    created: { type: Date, default: Date.now },
    createdByIp: String,
    revoked: Date,
    revokedByIp: String,
    replacedByToken: String
});

refreshSchema.virtual('isExpired').get(function () {
    return Date.now() >= this.expires;
});

refreshSchema.virtual('isActive').get(function () {
    return !this.revoked && !this.isExpired;
});

export default model('RefreshToken', refreshSchema);