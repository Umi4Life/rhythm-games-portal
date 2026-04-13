import { describe, it, expect } from 'vitest';
import { filterGames } from './search';
import type { Group } from '../types';

describe('filterGames', () => {
  const mockGroups: Group[] = [
    {
      groupName: 'Test Group',
      games: [
        {
          id: 'game-1',
          title: 'Maimai DX',
          logo: 'https://example.com/logo1.png',
          url: 'https://example.com/1',
          tags: ['sega', 'maimai'],
          region: 'jp'
        },
        {
          id: 'game-2',
          title: 'CHUNITHM',
          logo: 'https://example.com/logo2.png',
          url: 'https://example.com/2',
          tags: ['sega', 'chuni'],
          region: 'jp'
        },
        {
          id: 'game-3',
          title: 'Other Game',
          logo: 'https://example.com/logo3.png',
          url: 'https://example.com/3',
          tags: ['other'],
          region: 'intl'
        }
      ]
    }
  ];

  it('should return all games when search query is empty and favorites only is false', () => {
    const result = filterGames(mockGroups, '', [], false);
    expect(result.length).toBe(3);
  });

  it('should filter by title matching', () => {
    const result = filterGames(mockGroups, 'Maimai', [], false);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('game-1');
  });

  it('should filter by tags matching', () => {
    const result = filterGames(mockGroups, 'chuni', [], false);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('game-2');
  });

  it('should return only favorite games when showFavoritesOnly is true', () => {
    const favorites = ['game-1'];
    const result = filterGames(mockGroups, '', favorites, true);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('game-1');
  });

  it('should return empty array when no matches are found', () => {
    const result = filterGames(mockGroups, 'nonexistent', [], false);
    expect(result.length).toBe(0);
  });

  it('should combine search query and favorites filter correctly', () => {
    // Searching for "Maimai" but only showing favorites, where game-1 is not a favorite
    const result = filterGames(mockGroups, 'Maimai', ['game-2'], true);
    expect(result.length).toBe(0);

    // Searching for "CHUNITHM" and it IS a favorite
    const result2 = filterGames(mockGroups, 'CHUNITHM', ['game-2'], true);
    expect(result2.length).toBe(1);
  });
});