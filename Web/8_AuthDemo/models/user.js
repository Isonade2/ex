const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required."],
  },
  password: {
    type: String,
    required: [true, "password is required."],
  },
});

UserSchema.statics.findandValidate = async function (username, password) {
  const foundUser = await this.findOne({ username });

  const isValid = await bcrypt.compare(password, foundUser.password);
  return isValid ? foundUser : false;
};

UserSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return next();;
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model("User", UserSchema);
