<script lang="ts">
  import { Accordion, AccordionItem } from "flowbite-svelte";
  import GameGrid from "./GameGrid.svelte";
  import GameCard from "./GameCard.svelte";
  import type { Group, Game } from '../types';

  let { 
    isSearching, 
    filteredGames, 
    initialGroups, 
    searchQuery,
    favorites,
    onToggleFavorite,
    showFavoritesOnly
  }: { 
    isSearching: boolean, 
    filteredGames: Game[], 
    initialGroups: Group[],
    searchQuery: string,
    favorites: string[],
    onToggleFavorite: (id: string) => void,
    showFavoritesOnly: boolean
  } = $props();
</script>

{#if isSearching}
  <div class="space-y-6">
    {#if filteredGames.length > 0}
      <GameGrid 
        games={filteredGames} 
        {favorites} 
        {onToggleFavorite} 
      />
    {:else}
      <p class="text-center text-gray-500 dark:text-gray-400 mt-10">No games found matching "{searchQuery}"</p>
    {/if}
  </div>
{:else if showFavoritesOnly}
  <div class="space-y-6 px-4">
    {#if filteredGames.length > 0}
      <GameGrid 
        games={filteredGames} 
        {favorites} 
        {onToggleFavorite} 
      />
    {:else}
      <p class="text-center text-gray-500 dark:text-gray-400 mt-10">No favorite games found.</p>
    {/if}
  </div>
{:else}
  <Accordion multiple>
    {#each initialGroups as group}
      <!-- Only show group if it contains games that are either not filtered out or we aren't in favorites-only mode -->
      {#if !showFavoritesOnly || group.games.some(g => favorites.includes(g.title))}
         <AccordionItem open class="pb-0">
           {#snippet header()}
             <span class="text-md font-semibold capitalize py-1 px-1">{group.groupName}</span>
           {/snippet}

          <div class="grid grid-cols-3 sm:grid-cols-4 gap-2 p-0.5">
            {#each group.games as game}
              {#if !showFavoritesOnly || favorites.includes(game.title)}
                <GameCard 
                  {game} 
                  isFavorite={favorites.includes(game.id)} 
                  {onToggleFavorite} 
                />
              {/if}
            {/each}
          </div>
        </AccordionItem>
      {/if}
    {/each}
  </Accordion>
{/if}