import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';

const CommentData = () => {
    //const [posts, setPosts] = useState([]);
    const {user} = useContext(AuthContext)

    const { data: comments =[]} = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/comments');
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
                            <figure className='w-9'><img src={com.img} className=" rounded-full" alt="post"/></figure>
                            <div className="ml-5">
                                <div className='flex items-center'>
                                    <h1 className='font-bold mr-5'>{com.userName}</h1>
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