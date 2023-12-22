const { Schema, model } = require("mongoose");
const { handleErrorSave, handleValidateUpdate } = require("./hooks");
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");


const userSchema = new Schema(
  {
    first_name: {
      type: String,
      default: "User first name",
    },
    last_name: {
      type: String,
      default: "User last name",
    },
    login: {
      type: String,
      required: [true, "Login is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: [6, "password must be at least 6 characters"],
      required: [true, "Password is required"],
    },
    avatarURL: {
      type: String,
    },
    associated_customers: [
      {
        type: Schema.Types.ObjectId,
        ref: "customer",
      },
    ],
    associated_orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "order",
      },
    ],
    role: {
      type: String,
      default: "admin",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("findOneAndUpdate", handleValidateUpdate);

// password hashing and concatenation with salt
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


userSchema.post("findOneAndUpdate", handleErrorSave);
userSchema.post("save", (doc, next) => {
    console.log('new user created & saved');
    next()
});


// Define the login method as a static method
userSchema.statics.login = async function (login, password) {
    const user = await this.findOne({ login });
    if (user) { // if user is found
        const auth = await bcrypt.compare(password, user.password);
        if (auth) { // if password is correct
            console.log(`User: ${user.login} logged in`)
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error('Incorrect login');
}


module.exports = User = mongoose.model("User", userSchema);
