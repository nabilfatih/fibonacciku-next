import mongoose from "mongoose";

const connectDB = () => {
  if (mongoose.connections[0].readyState) {
    return;
  }

  mongoose.connect(
    process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) throw err;
    }
  );
};

export default connectDB;
