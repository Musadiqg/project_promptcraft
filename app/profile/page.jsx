"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [contributions, setContributions] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      if (session?.user.id) {
        try {
          const response = await fetch(`/api/users/${session.user.id}/posts`);
          const data = await response.json();
          setPosts(data);
          setContributions(data.length);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      }
    };
    fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (id) => {
    router.push(`/update-prompt?id=${id}`);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this prompt?")) return;

    try {
      const response = await fetch(`/api/prompt/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setPosts(posts.filter((post) => post._id !== id));
      } else {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete prompt");
      }
    } catch (error) {
      console.error("Error deleting prompt:", error);
      alert("Failed to delete the prompt. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Profile
      name={session?.user.username || 'My'}
      desc={`You have contributed ${contributions} prompt(s). \nJoined: ${formatDate(session?.user.createdAt)} \n ${(session?.user.email)}`}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
