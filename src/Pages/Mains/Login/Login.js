import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import useTitle from '../../../hooks/useTitle';
 

const Login = () => {
    
    const { register, formState: {errors}, handleSubmit } = useForm();
    const [loginError, setLoginError] = useState('');
    const {logIn, providerLogin} = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider();
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const handleGoogleSignIn = () =>{
        providerLogin(googleProvider)
        .then(result=>{
            const user = result.user;
            navigate(from, {replace: true});
            console.log(user);
            setLoginError("");
        })
        .catch((error) => {
            swal({
                title: "Unsuccessfully Log In",
                button: "OK",
                icon: "error"
              });
              setLoginError(error);
        });
    }

    const handleLogin = data => {
        console.log(data)
        setLoginError('');
        logIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                swal({
                    title: "Successfully Registered",
                    button: "OK",
                    icon: "success"
                });
                console.log(user);
                navigate(from, {replace: true});
            })
            .catch(error => {
                console.log(error.message)
                setLoginError(error.message);
            });
    }
    useTitle('Login');

    return (
        <div className=''>
            <div className="hero min-h-screen my-10">
            <div className="hero-content flex-col lg:flex-row-reverse justify-evenly w-full">
                <div className="text-center lg:text-left w-2/5">
                    <h1 className="text-5xl font-bold text-violet-500">Login now!</h1>
                    <p className='text-2xl mt-5'>Facebook helps you connect and share with the people in your life.</p>
                </div>
                <div className="card card-body flex-shrink-0 w-full max-w-sm w-4/5 lg:w-2/6 bg-white shadow-2xl rounded-lg">
                <form onSubmit={handleSubmit(handleLogin)} className="">
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" {...register("email", {required: "Email is Required"})} placeholder="E-mail" className="input input-bordered" />
                    {errors.email && <p role="alert">{errors.email?.message}</p>}

                    </div>

                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" {...register("password", {required: "Password is Required"})} placeholder="Password" className="input input-bordered" />
                    {errors.password && <p role="alert">{errors.password?.message}</p>}
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn bg-violet-500 hover:bg-violet-600">Login</button>
                    </div>
                    <div>
                        {loginError && <p className='text-red-600'>{loginError}</p>}
                    </div>
                    <label className="label">
                            <p className=''>Still not have account? <Link to={'/register'} className="text-green-500">Register Now</Link></p>
                    </label>
                </form>
                <div className='divider'>OR</div>
                <button onClick={handleGoogleSignIn} className='btn bg-green-500 mb-5'>Continue with Google</button>
                <button className='btn bg-green-500'>Continue with GitHub</button>  
                </div>
            </div>
            </div>
        </div>
    );
};

export default Login;