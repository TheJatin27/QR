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
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const docRef = await db.collection("teachers").add({
      ...req.body,
      createdAt: new Date()
    });

    res.status(200).json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}