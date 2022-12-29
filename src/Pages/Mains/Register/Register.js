import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider } from 'firebase/auth';
import useTitle from '../../../hooks/useTitle';
import { AuthContext } from '../../../contexts/AuthProvider';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Register = () => {
    const { register, formState: {errors}, handleSubmit } = useForm();
    const [error, setError] = useState('')
    const {createUser, updateUserProfile, providerLogin} = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname|| "/";

    const handleGoogleSignIn = () =>{
        providerLogin(googleProvider)
        .then((data)=>{
            navigate(from, {replace: true})
            setError("");
            const user ={ email: data.user.email, displayName: data.user.displayName, photoURL: data.user.photoURL, university: "undefined", address:"undefined"};
            socialLogin(user)
        })
        .catch((error) => {
            swal({
                title: "Unsuccessfully Log In",
                button: "OK",
                icon: "error"
              });
            setError(error);
        });
    }

    const socialLogin = (user) =>{
        fetch('https://instabook-server.vercel.app/users', {
            method: "POST",
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data =>{
            navigate(from, {replace: true})
            swal({
                title: "Successfully Registered",
                button: "OK",
                icon: "success"
              });
            console.log(data);
        })
    }

    const handleSignIn = (data) => {
        setError('');

        createUser(data.email, data.password, data.photoURL, data.displayName, data.lastName, data.university, data.address)
        .then( result => {
            const user = result.user;
            console.log(user);
            swal({
                title: "Successfully Registered",
                button: "OK",
                icon: "success"
              });
            const profile ={ displayName: data.displayName, photoURL: data.photoURL};
            updateUserProfile(profile)
            .then(()=>{
                saveUser(data.email, data.password, data.photoURL, data.displayName, data.lastName, data.university, data.address)
            })
            .catch( e => console.error(e));
        })
        .catch(e => {
            swal({
                title: "Not Registered",
                button: "OK",
                icon: "error"
              });
            setError(e.message);
        })
    }

    const saveUser = (email, password, photoURL, displayName, lastName, university, address) =>{
        const userData = {email, password, photoURL, displayName, lastName, university, address};
        fetch('https://instabook-server.vercel.app/users', {
            method: "POST",
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            navigate("/");
        })
    }
    useTitle('Register');
    return (
        <div>
            <div>
                <div className="hero min-h-screen my-10">
                <div className="hero-content flex-col lg:flex-row-reverse justify-evenly w-full">
                    <div className="text-center lg:text-left w-2/5">
                        <h1 className="text-5xl font-bold text-violet-400">Register now!</h1>
                        <p className="text-lg font-bold mt-5">JOIN WITH US</p>
                        <div className='bg-white p-5 rounded text-center mt-5 shadow-xl'>
                            <p>Already have Account?<Link to={'/login'} className="text-lime-300"> Login</Link></p>
                        </div>
                    </div>
                    <div className="card card-body flex-shrink-0 w-full max-w-sm w-4/5 lg:w-2/6 bg-white shadow-2xl rounded-lg">
                    <form onSubmit={handleSubmit(handleSignIn)} className="">
                    
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">First Name</span>
                        </label>
                        <input name="displayName" {...register("displayName", { required: "Name is Required" })} type="text" placeholder="First name" className="input input-bordered text-black h-8" />
                        {errors.name && <p role="alert">{errors.name?.message}</p>}
                        </div>

                        <div className='form-control'>
                        <label className="label">
                            <span className="label-text">Last Name</span>
                        </label>
                        <input name="lastName" {...register("lastName", { required: "Name is Required" })} type="text" placeholder="Last name" className="input input-bordered text-black h-8" />
                        {errors.name && <p role="alert">{errors.name?.message}</p>}
                        </div>

                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                            <input {...register("photoURL", {required: "PhotoURL is Required"})} type="text" placeholder="Photo url" className="input input-bordered text-black h-8" />
                        </div>

                        <div className='form-control'>
                        <label className="label">
                            <span className="label-text">University</span>
                        </label>
                            <input name="university" {...register("university", { required: "Field is Required" })} type="text" placeholder="University" className="input input-bordered text-black h-8" />
                        {errors.name && <p role="alert">{errors.name?.message}</p>}
                        </div>

                        <div className='form-control'>
                        <label className="label">
                            <span className="label-text">Address</span>
                        </label>
                            <input name="address" {...register("address", { required: "Field is Required" })} type="text" placeholder="Address" className="input input-bordered text-black h-8" />
                        {errors.name && <p role="alert">{errors.name?.message}</p>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register("email", {required: "Email is Required"})} placeholder="email" className="input input-bordered h-8" />
                            {errors.email && <p role="alert">{errors.email?.message}</p>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" {...register("password", {required: "Password is Required"})} placeholder="password" className="input input-bordered h-8" />
                            {errors.password && <p role="alert">{errors.password?.message}</p>}
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn bg-violet-400 hover:bg-violet-500 text-white border-0">Register</button>
                        </div>
                        {error && <p className='text-red-600'>{error}</p>}
                        
                        <div className='divider'>OR</div>
                        <div className='text-center'>
                            <h1 className='mb-5 font-bold text-violet-400'>Login With</h1>
                            <button onClick={handleGoogleSignIn} className='btn bg-sky-400 hover:bg-sky-500 mb-5 border-0'><FontAwesomeIcon onClick={handleGoogleSignIn} icon={faGoogle} className="mr-5"></FontAwesomeIcon>Google</button>  
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Register;