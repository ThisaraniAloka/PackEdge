import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    // Fetch user details
  }, [id]);

  if (!user) return <div className="text-center py-12">Loading user...</div>;

  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold mb-8">{user.name}</h1>
      <div className="max-w-2xl space-y-4">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Status:</strong> {user.status}</p>
      </div>
    </div>
  );
}
