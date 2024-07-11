"use client";

import React, { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.length > 0 ? (
        data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))
      ) : (
        <p>Fetching the latest prompts for you...</p>
      )}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearchChange = async (e) => {
    setSearchText(e.target.value);
    if (e.target.value.trim()) {
      try {
        const response = await fetch(`/api/prompt/search?search=${e.target.value}`);
        const data = await response.json();
        console.log("Search results:", data);  // Debugging line
        setPosts(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      fetchPosts();
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      console.log("Fetched posts:", data);  // Debugging line
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleTagClick = async (tag) => {
    setSearchText(tag);  // Set the search text to the clicked tag
    try {
      const response = await fetch(`/api/prompt/search?search=${tag}`);
      const data = await response.json();
      console.log("Tag search results:", data);  // Debugging line
      setPosts(data);
    } catch (error) {
      console.error("Error fetching tag results:", error);
    }
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder="Search for a tag, prompt, or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
