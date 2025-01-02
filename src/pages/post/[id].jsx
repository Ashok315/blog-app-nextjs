import { baseUrl } from "@/utils/baseUrl";

export default function SinglePost({ post }) {
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
          <p>{post.created_at}</p>
        </div>
        
        {/* Post Content */}
        <div className="text-lg text-gray-700 mb-8">
          <p>{post.content}</p>
        </div>

        {/* Comments Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>
          {/* Render comments here */}
        </div>
      </div>
    </div>
  );
}

// Fetch post data on each request
export async function getServerSideProps(context) {

  const { id } = context.params;

  try {
    const res = await fetch(`${baseUrl}/api/posts/${id}`);
    const post = await res.json();

        // Format the date on the server
        const formattedPost = {
          ...post,
          created_at: new Date(post.created_at).toLocaleDateString(),
        };
    
        return {
          props: { post: formattedPost },
        };

  } catch (error) {
      console.log(error.message)
  }
}
