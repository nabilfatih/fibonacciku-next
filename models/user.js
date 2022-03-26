import mongoose from "mongoose";
import validator from "validator";
const Schema = mongoose.Schema;

function randomAlphaNumeric() {
  return Math.random().toString(36).charAt(2);
}
function createFromPattern(pattern) {
  pattern = pattern.split("");
  return pattern.map((x) => x.replace("x", randomAlphaNumeric())).join("");
}

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
      default: createFromPattern("xxxxxxxxxx"),
    },
    password: {
      type: String,
    },
    emailToken: String,
    emailVerified: {
      type: String,
    },
    avatar: {
      path: { type: String, default: "/img/profile/default-icon.png" },
      filename: String,
    },
    background: {
      type: String,
      required: false,
      default: "/img/profile/default-background.png",
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
    isPassword: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    isAdmin: {
      type: Boolean,
      default: false,
    },
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
