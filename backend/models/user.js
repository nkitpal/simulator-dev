import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  score: { type: Number, required: true, default: 0 },
  code: { type: String, default: "" },
  error: { type: String, default: "" },
});

export default model("User", userSchema);
