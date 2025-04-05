import mongoose from 'mongoose';

const FraudulentUrlSchema = new mongoose.Schema({
  url: String,
  risk_level: String,
  detected_on: Date,
  category: String
});

export default mongoose.models.FraudulentUrl || mongoose.model('FraudulentUrl', FraudulentUrlSchema);
