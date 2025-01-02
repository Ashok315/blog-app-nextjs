import { dbQuery } from '../../../utils/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      // Fetch the single blog post by id
      const results = await dbQuery('SELECT * FROM posts WHERE id = ?', [id]);

      if (results.length > 0) {
        res.status(200).json(results[0]); // Send the first (and only) result
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch post', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
