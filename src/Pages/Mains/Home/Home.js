import React from 'react';
import LeftNav from '../../Shared/LeftNav/LeftNav';
import Post from './Post/Post';
import TopPost from './Toppost/TopPost';

const Home = () => {
    return (
        <div>
            <div className="grid grid-cols-4 gap-4">
                <div className='hidden lg:block'>
                    <LeftNav></LeftNav>
                </div>
                <div className='col-span-4 lg:col-span-3'>
                    <Post></Post>

                    <div className='m-auto px-5 lg:px-0'>
                        <h1 className='text-xl mb-5 text-violet-500'>Top Posts</h1>
                        <TopPost></TopPost>
                    </div>  
                </div>
            </div>
        </div>
    );
};

export default Home;