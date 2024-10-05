import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Admin() {
    const { isAdmin } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=> {
        if(!isAdmin) {
            toast.error('Access denied');
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className="container mt-3" style={{ display: 'flex', justifyContent: 'center' }}>
            <img
                src="https://t3.ftcdn.net/jpg/03/48/55/20/360_F_348552050_uSbrANL65DNj21FbaCeswpM33mat1Wll.jpg"
                alt="Admin Dashboard"
                style={{ maxWidth: '100%', height: 'auto' }}
            />
            <br />
        </div>
    );
}
