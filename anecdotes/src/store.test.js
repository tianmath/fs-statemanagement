import { it, expect, beforeEach, vi, describe } from 'vitest';
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

describe('with some anecdotes already in the state', () => {
  const anecdotes = [
    {
      content: 'Simplicity is the ultimate sophistication',
      id: '2',
      votes: 5,
    },
    {
      content: 'Make it work, then make it fast',
      id: '5',
      votes: 0,
    },
    {
      content: 'There are two hard things in computer science',
      id: '4',
      votes: 3,
    },
    {
      content: 'Real artists ship code',
      id: '1',
      votes: 7,
    },
    {
      content: 'Untested code is broken code',
      id: '3',
      votes: 2,
    },
  ];

  beforeEach(() => {
    useAnecdoteStore.setState({ anecdotes });
  });

  it('component displaying anecdotes receives the anecdotes from the store sorted by votes', () => {
    const { result: anecdotesResult } = renderHook(() => useAnecdotes());

    expect(anecdotesResult.current).not.toEqual(anecdotes);
    expect(anecdotesResult.current).toEqual(
      anecdotes.toSorted((anec1, anec2) => anec2.votes - anec1.votes),
    );
  });

  it('component displaying anecdotes recieves a properly filtered list of anecdotes', () => {
    useAnecdoteStore.setState({ filter: 'simplicity' });
    const { result: anecdotesResult } = renderHook(() => useAnecdotes());
    expect(anecdotesResult.current).toEqual([anecdotes[0]]);
  });

  it('voting increases the number of votes for an anecdote', async () => {
    const { result: anecdotesResult } = renderHook(() => useAnecdotes());

    const anecdoteId = '5';
    const anecdote = anecdotesResult.current.find(
      (anec) => anec.id === anecdoteId,
    );

    anecdoteService.update.mockResolvedValue({
      ...anecdote,
      votes: anecdote.votes + 1,
    });

    const { result: actionsResult } = renderHook(() => useAnecdotesActions());

    await act(async () => {
      await actionsResult.current.vote(anecdoteId);
    });

    expect(
      anecdotesResult.current.find((anec) => anec.id === anecdoteId).votes,
    ).toEqual(anecdote.votes + 1);
  });
});
