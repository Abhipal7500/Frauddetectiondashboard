import mongoose from 'mongoose';

const FraudTrendSchema = new mongoose.Schema({
  date: Date,
  fraud_cases_detected: Number
});

export default mongoose.models.FraudTrend || mongoose.model('FraudTrend', FraudTrendSchema);
