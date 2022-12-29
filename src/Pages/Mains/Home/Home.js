import React from 'react';
import LeftNav from '../../Shared/LeftNav/LeftNav';
import Post from './Post/Post';
import TopPost from './Toppost/TopPost';

const Home = () => {
    return (
        <div>
            <div className="grid grid-cols-4 gap-4">
                <div>
                    <LeftNav></LeftNav>
                </div>
                <div className='col-span-3'>
                    <Post></Post>

                    <div className='m-auto'>
                        <h1 className='text-xl mb-5 text-violet-500'>Top Posts</h1>
                        <TopPost></TopPost>
                    </div>  
                </div>
            </div>
        </div>
    );
};

export default Home;