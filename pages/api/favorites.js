import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();

  if (req.method === 'POST') {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    try {
      const result = await db.collection('favorites').insertOne({ token });
      return res.status(201).json({ message: 'Favorite token saved', result });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to save favorite token' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
