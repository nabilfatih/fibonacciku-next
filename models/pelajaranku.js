import mongoose from "mongoose";
const Schema = mongoose.Schema;

const pelajarankuSchema = new Schema(
  {
    userId: String,
    username: String,
    pelajaran: String,
    bab: String,
    query: String,
    querybab: String,
    icon: String,
  },
  { timestamps: true }
);

let Dataset =
  mongoose.models.pelajaranku ||
  mongoose.model("pelajaranku", pelajarankuSchema);
export default Dataset;
