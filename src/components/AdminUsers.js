import { useEffect, useState } from "react";

function AdminUsers() {
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
              <li key={user._id}>{user.fullName}</li>
            ))}
          </ul>
        </div>
    );
}

export default AdminUsers;
