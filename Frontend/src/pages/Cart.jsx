import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Cart() {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=> {
        if(!isAuthenticated()) {
            toast.error('login to continue');
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div>
            This is Cart 
        </div>
    );
}
