import { it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  },
}));

import anecdoteService from './services/anecdotes';
import useAnecdoteStore, { useAnecdotes, useAnecdotesActions } from './store';

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' });
  vi.clearAllMocks();
});

it('state is initialized with the anecdotes returned by the backend', async () => {
  const mockAnecdotes = [{ id: 1, content: 'Test', votes: 0 }];
  anecdoteService.getAll.mockResolvedValue(mockAnecdotes);

  const { result } = renderHook(() => useAnecdotesActions());

  await act(async () => {
    await result.current.initialize();
  });

  const { result: anecdotesResult } = renderHook(() => useAnecdotes());
  expect(anecdotesResult.current).toEqual(mockAnecdotes);
});
