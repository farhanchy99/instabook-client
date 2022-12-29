import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import moment from 'moment';
import swal from 'sweetalert';
import { AuthContext } from '../../../contexts/AuthProvider';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Comment = () => {
    const {user} = useContext(AuthContext)

    const handleComment = event =>{
        event.preventDefault();
        const form = event.target;
        const userName = user?.displayName || 'unregistered';
        const email = user?.email || 'unregistered';
        const img = user?.photoURL || 'unregistered';
        const comments = form.comments.value;


        const commentsData = {
            userName,
            email,
            img,
            comments,
            time: moment().format('MMMM Do YYYY, h:mm:ss a'),
        }

        fetch('http://localhost:5000/comments', {
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(commentsData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.acknowledged){
                swal({
                    title: "Order Added Successfully",
                    button: "OK",
                    icon: "success"
                  });
                form.reset();
            }
        })
        .catch(err => console.error(err));
    }

    return (
        <div>
            <div>
                <form onSubmit={handleComment}>
                    <div className='mt-5 m-auto'>

                        <div className='form-control'>
                            <div className='flex items-center'>

                                <input name="comments" type="text" placeholder="Add a Comment..." className="input w-full backdrop-blur-sm bg-white/30 mr-1.5 rounded-lg h-8" required/>

                                <button className='btn bg-violet-400 border-0 hover:bg-violet-500' type='submit'>
                                    <FontAwesomeIcon icon={faComment} className="text-xl font-bold"></FontAwesomeIcon>
                                </button>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Comment;