import React, { useEffect } from 'react';
import UserTable from '../../components/admin/UserTable';

export default function Users() {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    // Fetch users
    setLoading(false);
  }, []);

  if (loading) return <div className="text-center py-12">Loading users...</div>;

  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold mb-8">Users</h1>
      <UserTable users={users} />
    </div>
  );
}
