import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  dob: String,
  mobile: String,
});

const User = mongoose.model("user", UserSchema);

export default User;
