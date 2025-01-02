import { dbQuery } from '../../utils/db';

export default async function handler(req, res) {

    // search blog post

if (req.method === 'GET') {
    const { query } = req.query;
   
    try {
      const results = await dbQuery(
        `SELECT * FROM posts WHERE title LIKE ? OR content LIKE ? OR author LIKE ?`,
        [`%${query}%`, `%${query}%`, `%${query}%`]
      );

      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong'});
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }

}


