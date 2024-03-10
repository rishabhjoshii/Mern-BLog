import { format, formatISO9075 } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../UserContext';

const PostPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {userInfo} = useContext(UserContext);
    const [postInfo, setPostInfo] = useState(null);
    const param = useParams();
    // console.log(param);
    const id = param.id;   //this is blog or post id 

    useEffect(() => {
        fetch(`http://localhost:3000/post/${id}`)
          .then(response => {
            response.json().then(postInfo => {
              setPostInfo(postInfo);
            });
          });
      }, []);
    

    async function deletePost(){
      const confirmDelete = window.confirm('Are you sure you want to delete this post?');
      if (!confirmDelete) return;

      try {
        const data = {
          username : userInfo? userInfo.username : null,
        }
        const response = await fetch(`http://localhost:3000/post/${id}`, {
          method: "DELETE",
          body: JSON.stringify(data) ,
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
        });
    
        if (response.status===200) {
          console.log("Post deleted successfully");
          navigate('/');
        } 
        else {
          const errorData = await response.json();
          console.error("Failed to delete post:", errorData);
        }
      } 
      catch (error) {
        console.error("An error occurred while deleting post:", error);
      }
    }

    if(!postInfo) return '';
    console.log(postInfo);
    console.log("userInfo",userInfo);

    return (
        <div className='post-page'>
            <h1>{postInfo.title}</h1>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <div className='author'>by @{postInfo.author}</div>
            {postInfo!==null && userInfo!==null && postInfo.author === userInfo.username && (
              <div className='edit-options'>
                <div className='edit-row'>
                  <Link className='edit-btn' to={`/edit/${postInfo._id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    Edit Post
                  </Link>
                </div>
                <div className='edit-row'>
                  <Link onClick={deletePost} className='edit-btn' id='del-btn' to={location.pathname}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    Delete Post
                  </Link>
                </div>
              </div>
              
            )}
            <div className='image'>
                <img src={`http://localhost:3000/${postInfo.cover}`} alt="Image"/>
            </div>
            
            <div className='content' dangerouslySetInnerHTML={{__html:postInfo.content}}/>
        </div>
    )
}

export default PostPage