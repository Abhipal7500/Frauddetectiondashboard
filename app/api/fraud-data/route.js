import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/mongodb.js";
import FraudTrend from "@/lib/models/FraudTrend.js";
import FraudulentApp from "@/lib/models/FraudulentApp.js";
import FraudulentURL from "@/lib/models/FraudulentUrl";

export async function GET() {
  await ConnectDB();

  const fraud_trends_30_days = await FraudTrend.find().sort({ date: -1 }).limit(30);
  const fraudulent_apps = await FraudulentApp.find().sort({ reportedOn: -1 }).limit(20);
  const fraudulent_urls = await FraudulentURL.find().sort({ reportedOn: -1 }).limit(20);

  return NextResponse.json({
    fraud_trends_30_days,
    fraudulent_apps,
    fraudulent_urls,
  });
}
