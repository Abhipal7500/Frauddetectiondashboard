
import { ConnectDB } from '../lib/config/mongodb.js';
import FraudulentApp from '../lib//models/FraudulentApp.js';
import FraudulentUrl from '../lib/models/FraudulentUrl.js';
import FraudTrend from '../lib/models/FraudTrend.js';
import User from '../lib/models/User.js';

import { fraudData } from '../data/fraudData.js'; 

async function seed() {
  await ConnectDB();

  await FraudulentApp.insertMany(fraudData.fraudulent_apps);
  await FraudulentUrl.insertMany(fraudData.fraudulent_urls);
  await FraudTrend.insertMany(fraudData.fraud_trends_30_days);
  await User.insertMany(fraudData.user_authentication);

  console.log("Seeding completed.");
  process.exit();
}

seed();
