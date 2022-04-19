import mongoose from "mongoose";
const Schema = mongoose.Schema;

const pelajarankuSchema = new Schema(
  {
    userId: String,
    username: String,
    pelajaran: String,
    bab: String,
    subbab: String,
    judul: String,
    query: String,
    querybab: String,
    querysubbab: String,
    queryjudul: String,
    tipe: String,
    link: String,
  },
  { timestamps: true }
);

let Dataset =
  mongoose.models.pelajaranku ||
  mongoose.model("pelajaranku", pelajarankuSchema);
export default Dataset;
