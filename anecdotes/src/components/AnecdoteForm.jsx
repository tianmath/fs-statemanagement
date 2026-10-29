import { useAnecdotesActions } from '../store';

const AnecdoteForm = () => {
  const { add } = useAnecdotesActions();

  const addAnecdote = (e) => {
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    add(anecdote);
    e.target.reset();
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' data-testid='new' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
