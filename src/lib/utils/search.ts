export interface SearchableGame {
  id: string;
  title: string;
  logo: string;
  url: string;
  groupName?: string;
  tags?: string[];
}

export function filterGames(
  initialGroups: Array<{ groupName: string; games: SearchableGame[] }>,
  searchQuery: string,
  favorites: string[],
  showFavoritesOnly: boolean
): SearchableGame[] {
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