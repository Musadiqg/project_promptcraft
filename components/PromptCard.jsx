"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  const handleProfileClick = () => {
    router.push(`/profile/${post.creator._id}`);
  };

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer' onClick={handleProfileClick}>
          <Image
            src={post.creator?.image || '/assets/images/profile.svg'}
            alt="user_image"
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-courier font-semibold text-gray-900'>
              {post.creator?.username || 'Unknown User'}
            </h3>
            <p className='email_text font-courier text-sm text-gray-500 '>
              {post.creator?.email || 'No email available'}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={copied === post.prompt ? 'assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            width={16}
            height={16}
          />
        </div>
      </div>
      <p className='my-4 text-sm text-gray-700 font-courier'>{post.prompt}</p>
      <p className='font-courier text-sm brown_gradient cursor-pointer font-bold ' onClick={() => handleTagClick(post.tag)}>
        #{post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3 flex">
          <p
            className="font-courier text-sm brown_gradient cursor-pointer "
            onClick={() => handleEdit(post._id)}
          >
            Edit
          </p>

          <p
            className="font-courier text-sm brown_gradient cursor-pointer"
            onClick={() => handleDelete(post._id)}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
