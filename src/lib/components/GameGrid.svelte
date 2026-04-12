<script lang="ts">
  import GameCard from "./GameCard.svelte";

  interface Game {
    id: string;
    title: string;
    logo: string;
    url: string;
    groupName?: string;
  }

  let { 
    games, 
    favorites, 
    onToggleFavorite 
  }: { 
    games: Game[], 
    favorites: string[], 
    onToggleFavorite: (title: string) => void 
  } = $props();
</script>

<div class="grid grid-cols-3 sm:grid-cols-4 gap-4">
  {#each games as game}
    <GameCard 
      {game} 
      isFavorite={favorites.includes(game.id)} 
      {onToggleFavorite} 
    />
  {/each}
</div>