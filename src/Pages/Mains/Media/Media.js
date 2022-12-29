import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import LeftNav from '../../Shared/LeftNav/LeftNav';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-solid-svg-icons/faHeart';

const Media = () => {

    const { data: posts =[]} = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/posts');
            const data = await res.json();
            return data;
        }
    })

    return (
        <div>
            <div className="grid grid-cols-4 gap-4">
                <div>
                    <LeftNav></LeftNav>
                </div>
                <div className='col-span-3 my-10'>
                <h1 className='text-xl mb-5 text-violet-500'>Top Posts</h1>
                <div class="grid grid-cols-3 gap-4">
                {
                    posts.map( p=>
                        <div className="card w-80 bg-base-100 shadow-xl" key={p._id}>
                            <div className='px-10 py-5'>
                            <h2> <span className="font-bold">{p.userName}</span> posted</h2>
                            <p className='text-xs'>{p.time}</p>
                            </div>
                            <figure><img src={p.image} alt="post"/></figure>
                        <div className="card-body">
                            
                            <p className='text-sm'>{p.details.slice(0, 100) + '...'} <Link to={`/posts/${p._id}`} className="font-bold text-violet-500">Read More</Link></p>
                            <div className="card-actions justify-end border-t-2 border-gray-200 pt-5"> 
                                <div className='flex'>
                                    <FontAwesomeIcon icon={farHeart} className="text-red-600 mr-1"></FontAwesomeIcon>
                                    <p className='text-xs text-gray-400 mb-1'>{p.likes} Likes</p>
                                </div>

                                <div className='flex'>
                                    <FontAwesomeIcon icon={faComment} className="text-indigo-500 mr-1"></FontAwesomeIcon>
                                    <p className='text-xs text-gray-400 mb-1'>Likes</p>
                                </div>
                                
                            </div>
                        </div>
                        </div>
                        
                        )
                }
            </div> 
                </div>
            </div>
        </div>
    );
};

export default Media;