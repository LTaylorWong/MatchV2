// src/components/authentication-button.js

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthenticationButton = () => {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

    return isAuthenticated ?
        <button
        className="btn btn-primary btn-block"
        onClick={() => logout()}
        >
            Log Out
        </button>
        :
        <button
            className="btn btn-primary btn-block"
            onClick={() => loginWithRedirect()}
        >
            Log In
        </button>;
};

export default AuthenticationButton;