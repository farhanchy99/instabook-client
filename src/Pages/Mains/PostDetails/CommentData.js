import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const CommentData = () => {
    const {user} = useContext(AuthContext)
    const{_id} = useLoaderData();

    const { data: comments =[]} = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            const res = await fetch(`https://instabook-server.vercel.app/comments?postId=${_id}`);
            const data = await res.json();
            return data;
        }
    })

    return (
        <div className='my-2'>
            <div class="">
                {
                    comments.map( com=>
                        <div className="flex items-center mb-5" key={com._id}>
                            <figure className='w-9'><img src={com.img} className="rounded-full" alt="post"/></figure>
                            <div className="ml-5">
                                <div className='block lg:flex items-center'>
                                    <h1 className='font-bold text-xs lg:text-base mr-5'>{com.userName}</h1>
                                    <p className='text-sm'>{com.comments}</p>
                                </div>
                                <p className='text-xs'>{com.time}</p>
                            </div>
                        </div>
                        )
                }
            </div>
        </div>
    );
};

export default CommentData;