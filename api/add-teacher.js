const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    )
  });
}

const db = admin.firestore();

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const docRef = await db.collection("teachers").add({
      ...req.body,
      createdAt: new Date()
    });

    return res.status(200).json({ id: docRef.id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};