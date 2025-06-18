import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const ProfileForm = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    email: user?.email || '',
    phone: ''
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', profile);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
      <div className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={profile.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={profile.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          disabled
        />
      </div>
      <div className="mb-4">
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={profile.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Update Profile
      </button>
    </form>
  );
};

export default ProfileForm;