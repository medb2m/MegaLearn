<<<<<<< HEAD
import mongoose from 'mongoose'
=======
import mongoose from "mongoose";
>>>>>>> origin/main

const { Schema, model } = mongoose;

const AchievementSchema = new Schema({
<<<<<<< HEAD
    courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
    quizId: { type: Schema.Types.ObjectId, ref: 'Quiz' },
    score: Number,
    passed: Boolean,
    date: { type: Date, default: Date.now }
});

=======
  courseId: { type: Schema.Types.ObjectId, ref: "Course" },
  quizId: { type: Schema.Types.ObjectId, ref: "Quiz" },
  score: Number,
  passed: Boolean,
  date: { type: Date, default: Date.now },
});


>>>>>>> origin/main
const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    title: { type: String, required: true },
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
<<<<<<< HEAD
    achievements: [AchievementSchema]
});

UserSchema.virtual('isVerified').get(function () {
    return !!(this.verified || this.passwordReset);
=======
    achievements: [AchievementSchema],
    enrolls : [{ type: Schema.Types.ObjectId, ref: 'Course', required : true }]
})

UserSchema.virtual("isVerified").get(function () {
  return !!(this.verified || this.passwordReset);
>>>>>>> origin/main
});

UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // to remove when converted
<<<<<<< HEAD
        delete ret._id;
        delete ret.passwordHash;
    }
});

export default model('User', UserSchema);
=======
        delete ret._id
        delete ret.passwordHash
    }
});

export default model("User", UserSchema);
>>>>>>> origin/main
