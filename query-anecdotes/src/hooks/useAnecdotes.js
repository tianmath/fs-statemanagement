import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getAnecdotes,
  createAnecdote,
  updateAnecdote,
} from '../services/anecdotes';
import useNotify from './useNotify';

export const useAnecdotes = () => {
  const queryClient = useQueryClient();
  const { displayMessage } = useNotify();

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
      displayMessage(`Created '${newAnecdote.content}'`, 5000);
    },
    onError: (err) => {
      displayMessage(err.message, 5000);
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
      displayMessage(`you voted '${updatedAnecdote.content}'`, 5000);
    },
  });

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (content) => newAnecdoteMutation.mutate({ content, votes: 0 }),
    vote: (anecdote) =>
      updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 }),
  };
};
