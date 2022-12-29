import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';

const EditUni = ({modal}) => {
    const {user} = useContext(AuthContext);
    const {_id} = modal;
    const [Reviews, setReviews] = useState([]);
    const [update, setUpdate] = useState(false);
    const [newUni, setNewUni] = useState([]);

    useEffect(() => {
        fetch(
          `https://instabook-server.vercel.app/userdata?email=${user?.email}`
        )
          .then((res) => res.json())
          .then((data) => setReviews(data));
      }, [user, update]);

    const handleChange = (event) => {
        setNewUni(event.target.value);
      };
      const HandleUpdate = (id) => {
        fetch(`https://instabook-server.vercel.app/edituni/${id}`, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ updatedUni: newUni}),
        })
          .then((res) => res.json())
          .then((data) => setUpdate(!update));
      };


    return (
        <>
        <input type="checkbox" id="modalBook3" className="modal-toggle" />
        <div className="modal">
        <div className="modal-box relative">
            <label htmlFor="modalBook3" className="btn btn-sm btn-circle bg-violet-400 hover:bg-violet-500 absolute right-2 top-2 border-0">✕</label>
            <form onChange={handleChange}>
                <div className='card-body bg-base-100 m-auto'>

                    <div className='w-1/2'>
                        <h1 className='text-xl text-black font-bold mb-5'>Change University</h1>   
                    </div>

                    <div className='form-control'>
                        <input name="updatedUni" id="updatedUni" type="text" placeholder="Change University" className="input input-bordered w-full backdrop-blur-sm bg-white/30"/>
                    </div>

                    <button className='btn bg-violet-400 hover:bg-violet-500 border-0 mt-5' type='submit' onClick={() => HandleUpdate(_id)}>Save</button>
                </div>
            </form>
        </div>
        </div>
        </>
    );
};

export default EditUni;