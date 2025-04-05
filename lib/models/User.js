import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password_hashed: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Analyst'], required: true }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
