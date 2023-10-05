import mongoose from "mongoose";
const connect = (url) => {
    mongoose.set("strictQuery", true);
    mongoose
        .connect(url)
        .then(() => console.log("MongoDB connected"))
        .catch((err) => console.error(err));
};
const connectToDb = (url) => {
    try {
        connect(url);
    }
    catch (err) {
        console.error(err);
    }
};
export default connectToDb;
