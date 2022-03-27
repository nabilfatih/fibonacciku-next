import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    nama: {
      type: String,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: false,
      unique: true,
      default: null,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    emailToken: String,
    emailVerified: {
      type: String,
      default: false,
    },
    avatar: {
      path: { type: String, default: "/static/img/default-icon.png" },
      filename: String,
    },
    background: {
      type: String,
      required: false,
      default: "/static/img/default-background.png",
    },
    bio: {
      type: String,
      required: false,
      default: null,
    },
    website: {
      type: String,
      required: false,
      default: null,
    },
    instagram: {
      type: String,
      required: false,
      default: null,
    },
    github: {
      type: String,
      required: false,
      default: null,
    },
    twitter: {
      type: String,
      required: false,
      default: null,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

userSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 1 * 24 * 60 * 60,
    partialFilterExpression: {
      emailVerified: false,
    },
  }
);

let Dataset = mongoose.models.users || mongoose.model("users", userSchema);
export default Dataset;
