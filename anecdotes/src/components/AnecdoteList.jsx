import { useAnecdotes, useAnecdotesActions } from '../store';
import { useNotificationActions } from './NotificationStore';

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { vote, remove } = useAnecdotesActions();
  const { setMessage } = useNotificationActions();

  const handleVote = (anecdote) => {
    vote(anecdote.id);
    setMessage(`you voted '${anecdote.content}'`);
  };

  const handleDelete = (anecdote) => {
    remove(anecdote.id);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
            {!anecdote.votes && (
              <button onClick={() => handleDelete(anecdote)}>delete</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
