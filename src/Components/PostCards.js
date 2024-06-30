import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../features/PostsSlice";
import '../../src/PostCard.css';

const PostCard = ({post}) => {
const dispatch = useDispatch();

const handleRemove = () => {
    dispatch(deletePost(post.id));
};


const renderTimestamp = () => {
    const timestamp = new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });
    return <small className="post-timestamp">{timestamp}</small>;

};
const renderImage = () => {
    const imageUrl = `https://picsum.photos/150/150?random=${post.id}`;
    return <img src={imageUrl} alt={`Post ${post.id}`}/>;
  };
  
  return (
    <div className="post-card">
      
      <button className="remove-button" onClick={handleRemove}>X</button>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      {renderTimestamp()}
      {renderImage()}
    </div>
  );
};

export default PostCard;