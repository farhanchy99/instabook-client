import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import LeftNav from '../../Shared/LeftNav/LeftNav';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { Link, useLoaderData } from 'react-router-dom';
import moment from 'moment';
import swal from 'sweetalert';
import CommentData from './CommentData';
import { AuthContext } from '../../../contexts/AuthProvider';
import "../PostDetails/PostDetails.css"

const PostDetails = () => {
    const{_id, userName, time, image, details, likes, liked} = useLoaderData();
    const {user} = useContext(AuthContext)

    const handleComment = event =>{
        event.preventDefault();
        const form = event.target;
        const userName = user?.displayName || 'unregistered';
        const email = user?.email || 'unregistered';
        const img = user?.photoURL || 'unregistered';
        const comments = form.comments.value;


        const commentsData = {
            postId: _id,
            userName,
            email,
            img,
            comments,
            time: moment().format('MMMM Do YYYY, h:mm:ss a'),
        }

        fetch('http://localhost:5000/comments', {
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(commentsData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.acknowledged){
                swal({
                    title: "Order Added Successfully",
                    button: "OK",
                    icon: "success"
                  });
                form.reset();
            }
        })
        .catch(err => console.error(err));
    }

    return (
        <div>
            <div className="grid grid-cols-4">
                <div className='hidden lg:block'>
                    <LeftNav></LeftNav>
                </div>
                <div className='col-span-4 lg:col-span-3 my-10 px-5'>
                <h1 className='text-xl mb-5 text-violet-500'>Posts Details</h1>

                <div className="card lg:card-side bg-base-100 shadow-xl w-full lg:w-11/12" key={_id}>
                <figure className='w-full'><img src={image} alt="post"/></figure>
                <div className="card-body w-full lg:w-11/12">
                    <h2> <span className="font-bold">{userName}</span> posted</h2>
                    <div class="overflow-y-scroll scrollbar scrollbar-thumb-amber-400 scrollbar-track-gray-100 bg-scroll h-64 border-2 border-gray-40 rounded-lg px-2">
                        <p className='text-sm my-5'>{details}</p>
                        <div>
                            <CommentData></CommentData>
                        </div>
                    </div>
                    
                    <div className="card-actions"> 
                        <button className="flex">
                            {liked?<FontAwesomeIcon icon={farHeart} className="text-2xl text-red-600 mr-2"></FontAwesomeIcon> : <FontAwesomeIcon icon={faHeart} className="text-2xl text-red-600 mr-2"></FontAwesomeIcon>}
                        </button>
                        <p className='text-sm font-bold mb-1'>{likes} Likes</p>
                    </div>
                    
                    <div className='mt-2'>
                        <p className='text-xs text-gray-400'>{time}</p>
                    </div>

                    <div className='border-t-2 border-gray-200'>
                    <div>
                        <form onSubmit={handleComment}>
                            <div className='mt-5 m-auto'>

                                <div className='form-control'>
                                    <div className='flex items-center'>

                                        <input name="comments" type="text" placeholder="Add a Comment..." className="input w-full backdrop-blur-sm bg-white/30 mr-1.5 rounded-lg h-8" required/>

                                        <button className='btn bg-violet-400 border-0 hover:bg-violet-500' type='submit'>
                                            <FontAwesomeIcon icon={faComment} className="text-xl font-bold"></FontAwesomeIcon>
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;