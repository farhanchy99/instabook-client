import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import './Header.css'

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err));
    }

    return (
        <div className='bg-white shadow-lg'>
            <div className="container navbar m-auto px-4 lg:px-20">
                <div className="navbar-start">
                    <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="nav menu-compact dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52 text-center py-5">
                        <li className='mb-5'><NavLink to='/' className={({isActive})=> isActive ? 'active' : undefined} end>Home</NavLink></li>
                        <li className='mb-5'><NavLink to='/message'>Message</NavLink></li>
                        <li className='mb-5'><NavLink to='/media'>Media</NavLink></li>
                        <li className='mb-5'><NavLink to='/about'>About me</NavLink></li>
                        
                        {user?.uid ?
                        <>
                            <button onClick={handleLogOut} className="btn btn-xs lg:btn bg-violet-500 shadow-xl">Log Out</button>
                        </>
                        :   <Link to='/login'><button className="btn bg-violet-500 shadow-xl">Log In</button></Link>
                        }
                    </ul>
                    </div>
                    <NavLink className='text-2xl text-gray-900 font-semibold hidden lg:flex items-center' to='/'>
                        <p className='text-xl md:text-2xl lg:text-4xl ml-1.5 lg:ml-2.5'>InstaBook</p>
                    </NavLink>
                </div>

                <div className="navbar-center hidden lg:flex text-zinc-400 font-bold">
                    <ul className="nav menu-horizontal">
                        <li className='ml-5'><NavLink to='/' className={({isActive})=> isActive ? 'active' : undefined} end>Home</NavLink></li>
                        <li className='ml-5'><NavLink to='/message'>Message</NavLink></li>
                        <li className='ml-5'><NavLink to='/media'>Media</NavLink></li>
                        <li className='ml-5'><NavLink to='/about'>About me</NavLink></li>
                    </ul>
                </div>

                <div className="navbar-end">
                    <NavLink className="flex items-center justify-end">

                        {user?.uid ?
                        <>
                            <button onClick={handleLogOut} className="btn btn-sm transition ease-in-out delay-150 bg-violet-400 hover:-translate-y-1 hover:scale-110 hover:bg-violet-500 duration-300 shadow-xl border-0">Log Out</button>
                            <Link to='/about' className='w-1/4'><img src={user?.photoURL} className="rounded-full block lg:hidden" alt="" /></Link>
                        </>
                        : 
                        <>
                            <Link to='/login'><button className="btn btn-sm transition ease-in-out delay-150 bg-violet-400 hover:-translate-y-1 hover:scale-110 hover:bg-violet-500 duration-300 shadow-xl border-0">Log In</button></Link>
                        </>
                        }
                    </NavLink>
                </div>
                
            </div>
        </div>
    );
};

export default Header;