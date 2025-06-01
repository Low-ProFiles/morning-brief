// src/components/header.jsx
import React from 'react';

const Header = ({ onLogout }) => {
    return (
        <header>
            {onLogout && <button onClick={onLogout}>Logout</button>}
        </header>
    );
};

export default Header;