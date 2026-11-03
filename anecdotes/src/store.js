import { create } from 'zustand';
import anecdoteService from './services/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => ({
  content: anecdote,
  id: getId(),
  votes: 0,
});

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll();
      set(() => ({ anecdotes }));
    },
    add: (anec) =>
      set((state) => ({
        anecdotes: [...state.anecdotes, asObject(anec)],
      })),
    vote: (id) =>
      set((state) => ({
        anecdotes: state.anecdotes
          .map((anec) =>
            anec.id === id ? { ...anec, votes: anec.votes + 1 } : anec,
          )
          .toSorted((anec1, anec2) => anec2.votes - anec1.votes),
      })),
    setFilter: (value) => set(() => ({ filter: value.toLowerCase() })),
  },
}));

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes);
  const filter = useAnecdoteStore((state) => state.filter);

  if (filter) return anecdotes.filter((anec) => anec.content.includes(filter));

  return anecdotes;
};

export const useAnecdotesActions = () =>
  useAnecdoteStore((state) => state.actions);
