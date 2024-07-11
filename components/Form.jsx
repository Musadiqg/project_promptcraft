import React from 'react'
import Link from 'next/link';

const Form = ({

      type, post, setPost, submitting, handleSubmit
}) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='brown_gradient'>
          {type} Post
        </span>  
      
      </h1>

      <p className='desc font-courier text-left max-w-md'>
        {type} and share amazing prompts with the World and let your imagination run wild with any AI-Powered platform
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap7 glassmorphism' 
      
      >
        <label> 
          <span className='font-courier font-semibold text-base text-Background'>
            Your AI-Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost(
              { ...post, prompt: e.target.value})
            }
            placeholder='Write your prompt here...'
            required
            className='form_textarea'
          />
          <br />
        </label>

        <label> 
          <span className='font-courier font-semibold text-base text-Background'>
            Tag
            <span className='font-normal'>(product, webdevelopment, idea)</span>
          </span>

          <input
            value={post.tag}
            onChange={(e) => setPost(
              { ...post, tag: e.target.value})
            }
            placeholder='Ex. Cooking'
            required
            className='form_input'
          />
          <br></br>
        </label>

        <div className='flex mx-3 mb-5 gap-4 '>
          <Link href="/" className='text-gray-500 text-sm font-courier'>
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className=' flex-end px-5 py-2.5 text-sm brown_btn rounded-full'
            
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form
