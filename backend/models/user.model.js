import mongoose from 'mongoose'

const { Schema, model } = mongoose;

const AchievementSchema = new Schema({
    courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
    quizId: { type: Schema.Types.ObjectId, ref: 'Quiz' },
    score: Number,
    passed: Boolean,
    date: { type: Date, default: Date.now }
});


const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    title: { type: String, required: true },
    username: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    acceptTerms: Boolean,
    role: { type: String, required: true },
    verificationToken: String,
    verified: Date,
    resetToken: {
        token: String,
        expires: Date
    },
    passwordReset: Date,
    created: { type: Date, default: Date.now },
    updated: Date,
    achievements: [AchievementSchema],
    enrolls : [{ type: Schema.Types.ObjectId, ref: 'Course', required : true }],
    image : { type : String }
})

UserSchema.virtual('isVerified').get(function () {
    return !!(this.verified || this.passwordReset);
});

UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // to remove when converted
        delete ret._id
        delete ret.passwordHash
    }
});

export default model('User', UserSchema);
