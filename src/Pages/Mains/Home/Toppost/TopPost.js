import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/AuthProvider';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TopPost = () => {
    //const [posts, setPosts] = useState([]);
    const {user} = useContext(AuthContext)

    const { data: posts =[]} = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/posts');
            const data = await res.json();
            return data;
        }
    })

    return (
        <div className='my-10'>
            <div class="grid grid-cols-3 gap-4 my-10">
                {
                    posts.slice(0,3).map( p=>
                        <div className="card w-80 bg-base-100 shadow-xl" key={p._id}>
                            <div className='px-10 py-5'>
                            <h2> <span className="font-bold">{p.userName}</span> posted</h2>
                            <p className='text-xs'>{p.time}</p>
                            </div>
                            <figure><img src={p.image} alt="post"/></figure>
                        <div className="card-body">
                            
                            <p className='text-sm'>{p.details.slice(0, 100) + '...'} <Link to={`/posts/${p._id}`} className="font-bold text-violet-500">Read More</Link></p>
                            <div className="card-actions justify-end"> 
                                {p.likes? <FontAwesomeIcon icon={faHeart} className="text-4xl font-bold text-green-500"></FontAwesomeIcon> : <FontAwesomeIcon icon={farHeart} className="text-4xl font-bold text-green-500"></FontAwesomeIcon>

                                }
                                <FontAwesomeIcon icon={faComment} className="text-4xl font-bold text-green-500"></FontAwesomeIcon>
                            </div>
                        </div>
                        </div>
                        
                        )
                }
            </div>
            <button className='btn btn-info block m-auto'><Link to={'/media'}>Load More</Link></button>
        </div>
    );
};

export default TopPost;