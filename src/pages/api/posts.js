import { dbQuery } from '../../lib/db';

export default async function handler(req, res) {
  //get all posts
  if (req.method === 'GET') {
    try {
      const posts = await dbQuery('SELECT * FROM posts');
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  } 

}
