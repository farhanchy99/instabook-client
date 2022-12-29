import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const LeftNav = () => {
    const { user } = useContext(AuthContext);

    const { data: usersData =[]} = useQuery({
        queryKey: ['usersData'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/userdata?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    })

    return (
        <div>
            <div className=''>
            <div className="w-80">
            <div className="card-body flex items-center">
            {user?.uid ?
                <>
                    <div className='pt-10 flex items-center flex-col'>
                        <img src={user?.photoURL} alt="photoURL" className='w-8 lg:w-20 rounded-full lg:m-5'/>
                        {
                            usersData.map( p=>
                            <h1 className='text-gray-900 font-bold text-xl hidden lg:block'>{p.displayName}</h1>
                            )
                        }
                        <Link to='/about'><button className="btn btn-sm transition ease-in-out delay-150 bg-violet-400 hover:-translate-y-1 hover:scale-110 hover:bg-violet-500 duration-300 shadow-xl border-0 mt-5">About me</button></Link>
                    </div>
                </>
                : 
                <>
                    <div className='pt-10 flex items-center flex-col'>
                        <h1 className='text-violet-500 font-bold text-xl hidden lg:block'>Welcome to Instabook</h1>
                        <p className='text-gray-900 font-bold hidden lg:block text-center'>Join with us and Connect with world!</p>
                        <Link to='/login'><button className="btn btn-sm transition ease-in-out delay-150 bg-violet-400 hover:-translate-y-1 hover:scale-110 hover:bg-violet-500 duration-300 shadow-xl mt-5 border-0">Log In</button></Link>
                    </div>
                </>
            }
            </div>
            </div>
            </div>
        </div>
    );
};

export default LeftNav;