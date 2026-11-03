import { useAnecdotesActions } from '../store';
import { useNotificationActions } from './NotificationStore';

const AnecdoteForm = () => {
  const { add } = useAnecdotesActions();
  const { setMessage } = useNotificationActions();

  const addAnecdote = (e) => {
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    add(anecdote);
    setMessage(`Created '${anecdote}'`);
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
