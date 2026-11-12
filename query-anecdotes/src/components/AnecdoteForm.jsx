import { useAnecdotes } from '../hooks/useAnecdotes';

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdotes();

  const onCreate = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    addAnecdote(content);
    e.target.reset();
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
