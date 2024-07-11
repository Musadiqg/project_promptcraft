"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPromptDetails = async () => {
      if (promptId) {
        try {
          const response = await fetch(`/api/prompt/${promptId}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch prompt with id ${promptId}`);
          }
          const data = await response.json();
          if (data.error) {
            throw new Error(data.error);
          }
          setPost({
            prompt: data.prompt,
            tag: data.tag,
          });
        } catch (error) {
          console.error("Error fetching prompt details:", error);
          alert("Failed to load prompt details. Please try again.");
        }
      }
    };

    getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) {
      alert("Missing PromptId!");
      return;
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/profile");
      } else {
        const data = await response.json();
        throw new Error(data.error || "Failed to update prompt");
      }
    } catch (error) {
      console.error("Error updating prompt:", error);
      alert("Failed to update prompt. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
