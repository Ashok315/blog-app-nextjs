import { useState } from 'react';
import PostCard from '@/components/PostCard';
import BlogSearch from '@/components/BlogSearch';
import Pagination from '@/components/Pagination';
import { baseUrl } from '@/utils/baseUrl';

const Home = ({ posts }) => {
  const [filteredPosts, setFilteredPosts] = useState(posts);

  let postPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  let indexOfLastPost = currentPage * postPerPage;
  let indexOfFirstPost = indexOfLastPost - postPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredPosts(posts); // Reset to all posts if query is empty
    } else {
      const result = posts.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) || 
        post.content.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPosts(result);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Blog Web Application</h1>

      {/* Search blog */}
      <BlogSearch onSearch={handleSearch} />
      {/* List of blogs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {filteredPosts.slice(indexOfFirstPost, indexOfLastPost).map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination 
        postPerPage={postPerPage} 
        totalPosts={filteredPosts?.length} 
        currentPage={currentPage} 
        paginate={paginate} 
      />
    </div>
  );
};

// Fetch data at build time
export async function getStaticProps() {
  try {
    const res = await fetch(`${baseUrl}/api/posts`);
    const posts = await res.json();

    return {
      props: { posts }, 
    };
  } catch (error) {
     console.log(error.message)
  }
}

export default Home;
