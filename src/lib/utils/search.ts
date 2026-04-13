import type { Game } from '../types';

export function filterGames(
  initialGroups: Array<{ groupName: string; games: Game[] }>,
  searchQuery: string,
  favorites: string[],
  showFavoritesOnly: boolean
): Game[] {
  const query = searchQuery.toLowerCase();
  
  return initialGroups
    .flatMap((group) =>
      group.games.map((game) => ({ ...game, groupName: group.groupName }))
    )
    .filter((game) => {
      const matchesSearch =
        game.title.toLowerCase().includes(query) ||
        (game.tags && game.tags.some((tag) => tag.toLowerCase().includes(query)));
      
      const matchesFavorite = showFavoritesOnly ? favorites.includes(game.id) : true;
      
      return matchesSearch && matchesFavorite;
    });
}