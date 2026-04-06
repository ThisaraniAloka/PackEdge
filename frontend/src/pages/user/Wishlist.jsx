import React from 'react';
import ProfileForm from '../../components/user/ProfileForm';

export default function Profile() {
  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold mb-8">My Profile</h1>
      <div className="max-w-2xl">
        <ProfileForm />
      </div>
    </div>
  );
}
