import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  urn: { type: String, required: true },
  email: { type: String, required: true },
  password: {
    type: String,
    reqiured: true,
  },
  score: { type: Number, required: true, default: 0 },
  code: { type: String },
});

export default model("User", userSchema);
