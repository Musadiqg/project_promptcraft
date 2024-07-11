import PromptCard from './PromptCard';

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full'>
      <h2 className='head_text text-left'>
        <span className='brown_gradient'>{name === 'My' ? 'My Craftspace' : `${name}'s Craftspace`}</span>
      </h2>
      <p className='desc text-left font-courier whitespace-pre-line'>{desc}</p> {/* Add styling here */}

      <div className='mt-10 prompt_layout'>
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
