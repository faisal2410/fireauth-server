const mongoose =require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    picture: String,
    stripe_account_id: "",
    stripe_seller: {},
    stripe_session: {},
  },
  { timestamps: true }
);

const User= mongoose.model("User", userSchema);
module.exports=User;
