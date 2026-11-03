import { create } from 'zustand';
import anecdoteService from './services/anecdotes';

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll();
      set(() => ({ anecdotes }));
    },
    add: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content);
      set((state) => ({
        anecdotes: [...state.anecdotes, newAnecdote],
      }));
    },
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
