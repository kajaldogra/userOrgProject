import mongoose from "mongoose";
import { nanoid } from "nanoid";

const userModel = mongoose.Schema({
  _id: {
    type: String,
    default: () => nanoid(),
  },
  name: {
    type: String,
    required: true,
  },
  addressLine1: {
    city: String,
    state: String,
    country: String,
    zipCode: Number,
  },
  addressLine2: {
    city: String,
    state: String,
    country: String,
    zipCode: Number,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  userId: String,
});

const Organisation = mongoose.model("Organisation", userModel);
export default Organisation;
