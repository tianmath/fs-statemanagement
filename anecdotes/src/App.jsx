import { useAnecdotes, useAnecdotesActions } from './store';

const App = () => {
  const anecdotes = useAnecdotes();

  const { vote, add } = useAnecdotesActions();

  const addAnecdote = (e) => {
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    add(anecdote);
    e.target.reset();
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
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

export default App;
