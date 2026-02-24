import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    )
  });
}

const db = admin.firestore();

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const doc = await db.collection("teachers").doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(doc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}