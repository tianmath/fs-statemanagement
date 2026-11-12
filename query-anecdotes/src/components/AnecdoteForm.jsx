import { useContext } from 'react';
import { useAnecdotes } from '../hooks/useAnecdotes';
import NotificationContext from '../NotificationContext';

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdotes();
  const { displayMessage } = useContext(NotificationContext);

  const onCreate = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    try {
      await addAnecdote(content);
      displayMessage(`Created '${content}'`, 5000);
    } catch (err) {
      displayMessage(err.message, 5000);
    }
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
