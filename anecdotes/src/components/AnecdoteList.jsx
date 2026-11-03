import { useAnecdotes, useAnecdotesActions } from '../store';
import { useNotificationActions } from './NotificationStore';

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { vote } = useAnecdotesActions();
  const { setMessage } = useNotificationActions();

  const handleVote = (anecdote) => {
    vote(anecdote.id);
    setMessage(`You voted '${anecdote.content}'`);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
