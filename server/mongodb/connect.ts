import mongoose from "mongoose";

const connect = (url: string) => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(url)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));
};

const connectToDb = (url: string) => {
  try {
    connect(url);
  } catch (err) {
    console.error(err);
  }
};

export default connectToDb;
