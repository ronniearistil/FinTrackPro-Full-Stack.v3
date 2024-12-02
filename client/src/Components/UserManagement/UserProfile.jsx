import React from 'react';
import AccountManagement from './AccountManagement';

const UserProfile = ({ user }) => {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Welcome, {user.name}</h1>
            <p>Email: {user.email}</p>
            <AccountManagement userId={user.id} onAccountUpdate={() => window.location.reload()} />
        </div>
    );
};

export default UserProfile;
