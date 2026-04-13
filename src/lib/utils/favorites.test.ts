import { describe, it, expect, beforeEach, vi } from 'vitest';
import { loadFavorites, saveFavorites, toggleFavorite } from './favorites';

describe('favorites utils', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    const localStorageMock = (() => {
      let store: Record<string, string> = {};
      return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => { store[key] = value; },
        clear: () => { store = {}; }
      };
    })();
    vi.stubGlobal('localStorage', localStorageMock);
  });

  it('should return empty array if nothing is in localStorage', () => {
    expect(loadFavorites()).toEqual([]);
  });

  it('should load favorites from localStorage', () => {
    const favorites = ['1', '2'];
    localStorage.setItem('otoge-favorites', JSON.stringify(favorites));
    expect(loadFavorites()).toEqual(favorites);
  });

  it('should handle malformed JSON in localStorage gracefully', () => {
    localStorage.setItem('otoge-favorites', 'invalid json');
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(loadFavorites()).toEqual([]);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should save favorites to localStorage', () => {
    const favorites = ['1', '2'];
    saveFavorites(favorites);
    expect(localStorage.getItem('otoge-favorites')).toBe(JSON.stringify(favorites));
  });

  it('should toggle favorite correctly', () => {
    const favorites = ['1'];
    // Add new
    const added = toggleFavorite(favorites, '2');
    expect(added).toEqual(['1', '2']);
    // Remove existing
    const removed = toggleFavorite(added, '1');
    expect(removed).toEqual(['2']);
  });
});