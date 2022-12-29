import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { faImages } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';
import swal from 'sweetalert';
import { AuthContext } from '../../../../contexts/AuthProvider';
import './Post.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Post = () => {
    const {user} = useContext(AuthContext)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    
    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const handlePro = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })

        .then(res => res.json())
        .then(imgData => {
            if(imgData.success){
                console.log(imgData.data.url);
                const postData = {
                    userName : user?.displayName || 'unregistered',
                    email : user?.email || 'unregistered',
                    details: data.details,
                    time: moment().format('MMMM Do YYYY, h:mm:ss a'),
                    image: imgData.data.url,
                }

                fetch('http://localhost:5000/posts', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json', 
                    },
                    body: JSON.stringify(postData)
                })
                .then(res => res.json())
                .then(result =>{
                    console.log(result);
                    swal({
                        title: "Product Added Successfully",
                        button: "OK",
                        icon: "success"
                    });
                })
                reset()
            }
        })
    }

    return (
        <div>
            <div className=''>
        <div>
            <div className='my-10'>
            <form onSubmit={handleSubmit(handlePro)}>
                <div className='card-body w-11/12 lg:w-3/5 bg-base-100 shadow-2xl rounded-2xl p-4 m-auto my-10'>

                    <div className='form-control'>
                        <div className='flex'>
                        <input type="text" placeholder="What's on your mind?" {...register("details", {required: "Type Something"})} className="input input-bordered w-full backdrop-blur-sm bg-white/30 mr-1.5 rounded-full"/>

                        <div className="upload">
                            <button className='btn bg-white hover:bg-base-200 upload-button relative overflow-hidden border-0 rounded-full' type='submit'>
                                <FontAwesomeIcon icon={faImages} className="text-4xl font-bold text-green-500"></FontAwesomeIcon>
                                <input type="file" {...register("image", {
                                    required: "Photo is Required"
                                })} className="input input-bordered w-full backdrop-blur-sm bg-white/30 absolute" />
                                {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                            </button>
                        </div>
                        </div>
                    </div>

                    <button className='btn bg-violet-400 border-0 hover:bg-violet-500' type='submit'>Post</button>
                </div>
            </form>
            
        </div>
        </div>

        </div>
        </div>
    );
};

export default Post;