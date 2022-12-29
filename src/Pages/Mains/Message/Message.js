import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const Message = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <div className=''>
            <div className="card-body flex items-center py-40">
            {user?.uid ?
                <>
                    <div className='pt-10 flex items-center flex-col'>
                        <h1 className='text-gray-900 font-bold text-xl hidden lg:block'>This is message</h1>
                    </div>
                </>
                : 
                <>
                    <div className='pt-10 flex items-center flex-col'>
                        <h1 className='text-violet-500 font-bold text-5xl hidden lg:block'>Welcome to Instabook</h1>
                        <p className='text-gray-900 text-xl font-bold hidden lg:block text-center'>Join with us and Connect with world!</p>
                        <Link to='/login'><button className="btn btn-sm transition ease-in-out delay-150 bg-violet-400 hover:-translate-y-1 hover:scale-110 hover:bg-violet-500 duration-300 shadow-xl mt-5 border-0">Please Log In</button></Link>
                    </div>
                </>
            }
            </div>
            </div>
        </div>
    );
};

export default Message;