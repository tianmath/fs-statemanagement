import { create } from 'zustand';
import anecdoteService from './services/anecdotes';

const anecdotesDescendingSort = (anec1, anec2) => anec2.votes - anec1.votes;

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll();
      set(() => ({ anecdotes: anecdotes.toSorted(anecdotesDescendingSort) }));
    },
    add: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content);
      set((state) => ({
        anecdotes: [...state.anecdotes, newAnecdote],
      }));
    },
    remove: async (id) => {
      anecdoteService.remove(id);
      set((state) => ({
        anecdotes: state.anecdotes.filter((anec) => anec.id !== id),
      }));
    },
    vote: async (id) => {
      const anecdote = get().anecdotes.find((anec) => anec.id === id);
      const updated = await anecdoteService.update(id, {
        ...anecdote,
        votes: anecdote.votes + 1,
      });
      set((state) => ({
        anecdotes: state.anecdotes
          .map((anec) => (anec.id === id ? updated : anec))
          .toSorted(anecdotesDescendingSort),
      }));
    },
    setFilter: (value) => set(() => ({ filter: value.toLowerCase() })),
  },
}));

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes);
  const filter = useAnecdoteStore((state) => state.filter);

  if (filter)
    return anecdotes.filter((anec) =>
      anec.content.toLowerCase().includes(filter),
    );

  return anecdotes;
};

export const useAnecdotesActions = () =>
  useAnecdoteStore((state) => state.actions);
