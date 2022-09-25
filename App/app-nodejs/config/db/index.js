import mongoose from "mongoose";
async function ConnectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/suarDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect successfully!!!");
  } catch (error) {
    console.log(error);
  }
}
export default ConnectDB;
