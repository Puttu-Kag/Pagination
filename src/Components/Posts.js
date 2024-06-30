import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import Loading from './Loading';
import PostCard from './PostCards';
import { fetchPosts, setPage } from '../features/PostsSlice';
import '../../src/posts.css'; 


const Posts = () => {
    const dispatch = useDispatch();
    const { items, loading, currentPage } = useSelector(state => state.posts);

    useEffect(() => {
        dispatch(fetchPosts());
      }, [dispatch]);
    
      if (loading) {
        return <Loading />;
      }
      const postsPerPage = 6;
      const startIndex = (currentPage - 1) * postsPerPage;
      const currentPosts = items.slice(startIndex, startIndex + postsPerPage);
      const totalPages = Math.ceil(items.length / postsPerPage);
    
      const handlePageChange = (pageNumber) => {
        dispatch(setPage(pageNumber));
      };
      return (
        <div >
          <div className="posts">
            {currentPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <div className="pagination">
            <button 
              disabled={currentPage === 1} 
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button 
                key={index + 1} 
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button 
              disabled={currentPage === totalPages} 
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      );
    };
    
    export default Posts;
    