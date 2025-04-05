
import mongoose from 'mongoose';

const FraudulentAppSchema = new mongoose.Schema({
  app_name: String,
  developer: String,
  category: String,
  risk_level: String,
  reported_on: Date
});

export default mongoose.models.FraudulentApp || mongoose.model('FraudulentApp', FraudulentAppSchema);
