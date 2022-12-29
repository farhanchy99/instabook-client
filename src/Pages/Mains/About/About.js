import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import EditUser from './EditUser';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditEmail from './EditEmail';
import EditUni from './EditUni';
import EditAdd from './EditAdd';

const About = () => {
    const {user} = useContext(AuthContext);
    const [modal, setModal] = useState(null)

    const { data: usersData =[]} = useQuery({
        queryKey: ['usersData'],
        queryFn: async () => {
            const res = await fetch(`https://instabook-server.vercel.app/userdata?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    })

    return (
        <div className=' px-5 lg:px-0'>
            <div className="card w-full lg:w-96 bg-base-100 shadow-xl m-auto my-10">
                {
                    usersData.map( p=>
                        <div className='py-10' key={p._id}>
                            <figure className='w-2/5 rounded-full m-auto'><img src={p.photoURL} alt="post"/></figure>
                            <div className="">
                                <div className='text-center mb-12 flex items-center flex-col justify-center'>
                                    <h2 className="font-bold text-3xl mb-2">{p.displayName}</h2>

                                    <div className="card-actions justify-end items-center flex md:block lg:flex">
                                    <label onClick={() => setModal(p)} htmlFor="modalBook1" className="btn btn-sm border-0 bg-violet-400 hover:bg-violet-500 shadow-xl border-white ml-2"><FontAwesomeIcon icon={faPenToSquare} className="text-xl font-bold"></FontAwesomeIcon></label>
                                        {
                                            modal&&
                                            <EditUser
                                            modal={modal}
                                            ></EditUser>
                                        }
                                    </div>
                                </div>
                                <div className='px-10'>
                                    <div className='flex align-items justify-between mb-5'>
                                        <p className='text-lg'><span className='text-violet-500 font-bold'>E-Mail:</span> {p.email}</p>

                                        <div className="card-actions justify-end items-center flex md:block lg:flex">
                                        <label onClick={() => setModal(p)} htmlFor="modalBook2" className="border-0 text-violet-400 hover:text-violet-500 shadow-xl border-white ml-2"><FontAwesomeIcon icon={faPenToSquare} className="text-xl font-bold"></FontAwesomeIcon></label>
                                            {
                                                modal&&
                                                <EditEmail
                                                modal={modal}
                                                ></EditEmail>
                                            }
                                        </div>
                                    </div>

                                    <div className='flex align-items justify-between mb-5'>
                                        <p className='text-lg'><span className='text-violet-500 font-bold'>University:</span> {p.university}</p>

                                        <div className="card-actions justify-end items-center flex md:block lg:flex">
                                        <label onClick={() => setModal(p)} htmlFor="modalBook3" className="border-0 text-violet-400 hover:text-violet-500 shadow-xl border-white ml-2"><FontAwesomeIcon icon={faPenToSquare} className="text-xl font-bold"></FontAwesomeIcon></label>
                                            {
                                                modal&&
                                                <EditUni
                                                modal={modal}
                                                ></EditUni>
                                            }
                                        </div>
                                    </div>

                                    <div className='flex align-items justify-between mb-5'>
                                        <p className='text-lg'><span className='text-violet-500 font-bold'>Address:</span> {p.address}</p>

                                        <div className="card-actions justify-end items-center flex md:block lg:flex">
                                        <label onClick={() => setModal(p)} htmlFor="modalBook4" className="border-0 text-violet-400 hover:text-violet-500 shadow-xl border-white ml-2"><FontAwesomeIcon icon={faPenToSquare} className="text-xl font-bold"></FontAwesomeIcon></label>
                                            {
                                                modal&&
                                                <EditAdd
                                                modal={modal}
                                                ></EditAdd>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        )
                }
            </div>
        </div>
    );
};

export default About;