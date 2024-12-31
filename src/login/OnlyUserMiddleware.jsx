import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function OnlyUserMiddleware({ usersAllowed, children }) {
    const navigate = useNavigate();
    const role = localStorage.getItem('role');

    useEffect(() => {
        if (!usersAllowed.includes(role)) {
            navigate('/');
        }
    }, [role, navigate, usersAllowed]);

    return children;
}

export default OnlyUserMiddleware;
