"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Profile from '@components/Profile';

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [contributions, setContributions] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${id}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/users/${id}/posts`);
        const data = await response.json();
        setPosts(data);
        setContributions(data.length);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    if (id) {
      fetchUser();
      fetchPosts();
    }
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Profile 
      name={user?.username || 'User'}
      desc={`${user?.username || 'This user'} has contributed ${contributions} prompt(s). \nJoined: ${formatDate(user?.createdAt)} \n${(user?.email)}`}
      data={posts}
      handleEdit={null}
      handleDelete={null}
    />
  );
};

export default UserProfile;
