export function loadFavorites(): string[] {
  const stored = localStorage.getItem("otoge-favorites");
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
  localStorage.setItem("otoge-favorites", JSON.stringify(favorites));
}

export function toggleFavorite(favorites: string[], id: string): string[] {
  if (favorites.includes(id)) {
    return favorites.filter(f => f !== id);
  } else {
    return [...favorites, id];
  }
}