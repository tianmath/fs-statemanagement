import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getAnecdotes,
  createAnecdote,
  updateAnecdote,
} from '../services/anecdotes';

export const useAnecdotes = () => {
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
  });

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));
    },
  });

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((anec) =>
          anec.id === updatedAnecdote.id ? updatedAnecdote : anec,
        ),
      );
    },
  });

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (content) =>
      newAnecdoteMutation.mutateAsync({ content, votes: 0 }),
    vote: (anecdote) =>
      updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 }),
  };
};
