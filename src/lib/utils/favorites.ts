const SHOW_FAVORITES_ONLY_KEY = "otoge-show-favorites-only";
const FAVORITES_KEY = "otoge-favorites";

export function loadFavorites(): string[] {
  const stored = localStorage.getItem(FAVORITES_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse favorites", e);
      return [];
    }
  }
  return [];
}

export function saveFavorites(favorites: string[]): void {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function toggleFavorite(favorites: string[], id: string): string[] {
  if (favorites.includes(id)) {
    return favorites.filter(f => f !== id);
  } else {
    return [...favorites, id];
  }
}

export function saveShowFavoritesOnly(value: boolean): void {
  localStorage.setItem(SHOW_FAVORITES_ONLY_KEY, String(value));
}

export function loadShowFavoritesOnly(): boolean {
  return localStorage.getItem(SHOW_FAVORITES_ONLY_KEY) === "true";
}
