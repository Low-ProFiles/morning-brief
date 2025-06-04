// src/components/header.jsx
import React from 'react';
type HeaderProps = {
  onLogout?: () => void;
};

const Header = ({ onLogout }: HeaderProps) => {
    return (
        <header>
            {onLogout && <button onClick={onLogout}>Logout</button>}
        </header>
    );
};

export default Header;