import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function SinglePost() {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/posts/${id}`)
        .then((response) => response.json())
        .then((data) => setPost(data));
    }
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white border rounded-lg shadow-lg max-w-3xl mx-auto p-8">
        {/* Post Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        
        {/* Author and Date */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <p>By {post.author}</p>
          <span className="mx-2">|</span>
          <p>{new Date(post.created_at).toLocaleDateString()}</p>
        </div>
        
        {/* Post Content */}
        <div className="text-lg text-gray-700 mb-8">
          <p>{post.content}</p>
        </div>

        {/* Comments Section */}

      </div>
    </div>
  );
}

