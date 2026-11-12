import { useState } from 'react';
import NotificationContext from './NotificationContext';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useAnecdotes } from './hooks/useAnecdotes';

const App = () => {
  const { anecdotes, isPending, isError, vote } = useAnecdotes();

  const [message, setMessage] = useState('');
  const [messageTimer, setMessageTimer] = useState(null);

  const displayMessage = (msg, timeout) => {
    if (messageTimer !== null) clearTimeout(messageTimer);

    setMessage(msg);
    const currentMessageTimer = setTimeout(() => {
      setMessage('');
      setMessageTimer(null);
    }, timeout);
    setMessageTimer(currentMessageTimer);
  };

  const handleVote = (anecdote) => {
    vote(anecdote);
    displayMessage(`you voted '${anecdote.content}'`, 5000);
  };

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  if (isPending) {
    return <div>loading data...</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <NotificationContext.Provider value={{ message, displayMessage }}>
        <Notification />
        <AnecdoteForm />
      </NotificationContext.Provider>

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

export default App;
