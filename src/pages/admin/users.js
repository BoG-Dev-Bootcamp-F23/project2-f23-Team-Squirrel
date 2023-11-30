import React, { useState, useEffect } from 'react';
import styles from '@/styles/UserDisplay.module.css';

export default function users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const result = await fetch("/api/admin/users");
            const userData = await result.json();
            setUsers(userData);
        };
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map(user => (
                    user.fullname && (
                        <li key={user._id}>
                            {user.fullname} - {user.isAdmin ? 'Admin' : 'User'} - Location: {user.location || 'Not specified'}
                        </li>
                    )
                ))}
            </ul>
        </div>
    );
}
