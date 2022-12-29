import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../../contexts/AuthProvider';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLoaderData } from 'react-router-dom';

const Comment = () => {
    const {_id} = useLoaderData

    

    return (
        <div>
            
        </div>
    );
};

export default Comment;