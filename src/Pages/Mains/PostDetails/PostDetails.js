import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import LeftNav from '../../Shared/LeftNav/LeftNav';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { Link, useLoaderData } from 'react-router-dom';
import Comment from './Comment';
import CommentData from './CommentData';

const PostDetails = () => {
    const{_id, userName, time, image, details, likes} = useLoaderData();

    return (
        <div>
            <div className="grid grid-cols-4">
                <div>
                    <LeftNav></LeftNav>
                </div>
                <div className='col-span-3 my-10'>
                <h1 className='text-xl mb-5 text-violet-500'>Top Posts</h1>

                <div className="card lg:card-side bg-base-100 shadow-xl w-11/12" key={_id}>
                <figure className='w-full'><img src={image} alt="post"/></figure>
                <div className="card-body w-11/12">
                    <h2> <span className="font-bold">{userName}</span> posted</h2>
                    <div>
                        <p className='text-sm my-5'>{details}</p>
                        <div>
                            <CommentData></CommentData>
                        </div>
                    </div>
                    
                    <div className="card-actions"> 
                        <button className="flex">
                            <FontAwesomeIcon icon={farHeart} className="text-2xl text-red-600 mr-2"></FontAwesomeIcon>
                        </button>
                        <p className='text-sm font-bold mb-1'>{likes} Likes</p>
                    </div>
                    
                    <div className='mt-5'>
                        <p className='text-xs text-gray-400'>{time}</p>
                    </div>

                    <div className='border-t-2 border-gray-200'>
                        <Comment></Comment>
                    </div>
                </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;