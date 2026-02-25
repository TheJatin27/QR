const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
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
      createdAt: new Date(),
    });

    return res.status(200).json({ id: docRef.id });
  } catch (error) {
    console.error("FIREBASE ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
};