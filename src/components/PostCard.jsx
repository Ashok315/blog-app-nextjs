import Link from 'next/link';

export default function PostCard({ post}) {
  return (
    <div className='border p-4 rounded-lg shadow-md'>
        <Link href={`/post/${post.id}`}><h2 className='text-[20px]'>{post.title}</h2></Link>
      <p>{post.content.slice(0, 100)}...</p>
      <Link href={`/post/${post.id}`} className='text-sm text-gray-700'>Read more</Link>
    </div>
  );
}
